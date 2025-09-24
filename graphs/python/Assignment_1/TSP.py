# -*- coding: utf-8 -*-
"""
@author: Aron P. Tatai
@author: (original) Rolf van Lieshout
"""

## GUIDE TO KEYWORDS
## @Source: sourcing ideas or improvements that are from Stackoverflow/AI/Other
## @Note: Other explanation

import numpy as np
import math
import os
import random


class Point2D:
    """Class for representing a point in 2D space"""

    def __init__(self, id, x, y):
        self.id = id
        self.x = x
        self.y = y

    # method that computes the rounded euclidian distance between two 2D points
    def getDistance(c1, c2):  #
        dx = c1.x - c2.x
        dy = c1.y - c2.y
        return math.sqrt(dx ** 2 + dy ** 2)


class TSP:
    """
    Class for representing a Traveling Salesman Problem
    
    Attributes
    ----------
    nCities : int
        the number of cities
    cities : list of ints
        the cities, all represented by integers
    distMatrix : 2D array
        matrix with all distances between cities. Distance between city i and city j is distMatrix[i-1][j]
    
    """

    def __init__(self, tspFileName):
        """
        Reads a .tsp file and constructs an instance. 
        We assume that it is an Euclidian TSP

        Parameters
        ----------
        tspFileName : str
            name of the file
        """
        points = list()  # add all points to list
        f = open(tspFileName)
        self.tspFileName = tspFileName
        # @Note: Remains unchanged
        for line in f.readlines()[6:-1]:  # start reading from line 7, skip last line
            asList = line.split()
            floatList = list(map(float, asList))

            id = int(floatList[0]) - 1  # convert to int, subtract 1 because Python indices start from 0
            x = floatList[1]
            y = floatList[2]

            c = Point2D(id, x, y)
            points.append(c)
        f.close()

        print("[init] Read in all ", len(points), " points, start computing distance matrix")

        self.points = points
        self.nCities = len(points)
        self.cities = list(range(self.nCities))
        self.twoOptSweepFrom = 0

        # compute distance matrix, assume Euclidian TSP
        # @source: ChatGPT, this is the only code in my project written by AI,
        # since it is not part of the main assignment, only a loading step, but for large networks it took too much time
        # Using NumPy's broadcasting works here because the axes are independent.
        # This reduced distance mx calculation time by 2/3.
        coords = np.array([[p.x, p.y] for p in points], dtype=np.float64)
        diffs = coords[:, None, :] - coords[None, :, :]
        self.distMatrix = np.sqrt(np.sum(diffs ** 2, axis=-1))
        # end AI-assisted code

        print("[init] Finished computing distance matrix")

    def getTour_NN(self, start):
        """
        Performs the nearest neighbour algorithm

        Parameters
        ----------
        start : int
            starting point of the tour

        Returns
        -------
        tour : list of ints
            order in which the cities are visitied.

        """
        tour = [start]
        notInTour = self.cities.copy()
        notInTour.remove(start)

        for i in range(self.nCities - 1):
            curCity = tour[i]
            closestDist = -1  # initialize with -1
            closestCity = None  # initialize with None

            # find closest city not yet in tour
            for j in notInTour:
                dist = self.distMatrix[curCity][j]
                if dist < closestDist or closestCity is None:
                    # update the closest city and distance
                    closestDist = dist
                    closestCity = j

            tour.append(closestCity)
            notInTour.remove(closestCity)
        return tour

    def getCitiesCopy(self):
        return self.cities.copy()

    def evaluateSolution(self, tour, echo=False):
        if self.isFeasible(tour):
            costs = self.computeCosts(tour)
            echo and print("The solution is feasible with costs " + str(costs))
            return costs
        else:
            raise Exception("Solution is infeasable.")

    def isFeasible(self, tour):
        """
        Checks if tour is feasible

        Parameters
        ----------
        tour : list of integers
            order in which cities are visited. For a 4-city TSP, an example tour is [3, 1, 4, 2]

        Returns
        -------
        bool
            TRUE if feasible, FALSE if infeasible.

        """
        # first check if the length of the tour is correct
        if len(tour) != self.nCities:
            raise Exception("Solution is infeasable: Length of tour is incorrect")
            return False
        else:
            # check if all cities in the tour
            for city in self.cities:
                if city not in tour:
                    return False
        return True

    def getTour_OutlierInsertion_Parametrized(self, start, graspDistance, _):
        """
        Performs the Outlier Insertion algorithm.

        Parameters
        ----------
        graspDistance : lambda(candidates: list[]) -> int
            The selection for the location at which to insert the furthest node is
            parametrized by a function called `graspDistance` which receives as a parameter the list of candidate furthest points.
            The function should return the index of the selected candidate. Without GRASP, it should be 0. For GRASP, see
            implementation in getTour_GRASPedInsertion
        start : int
            starting point of the tour

        Returns
        -------
        tour : list of ints
            order in which the cities are visitied.

        """
        tour = [start]
        benchmark_iter = 0
        notInTour = self.cities.copy()
        notInTour.remove(start)
        with open(self.tspFileName + "_outlierInsert.json", "w", encoding="utf-8") as logs:
            LOG and logs.write("[")
            print("[outlier insertion] Start computing NN tour")

            # initialize closestDist
            # @source for declare an array of uniform values https://stackoverflow.com/questions/4056768/how-to-declare-array-of-zeros-in-python-or-an-array-of-a-certain-size
            closestDist = [float("inf")] * self.nCities

            # as initialisation, for each node not in tour (so every except the start point), init the distance matrix.
            # the closest distance will be to the starting point, as it is the only one in the tour currently
            for j in notInTour:
                closestDist[j] = self.distMatrix[tour[0], j]

            # outer loop: iterate over the number of cities. In each iteration, a city will be added to the tour.
            for i in range(self.nCities - 1):
                DEBUG and i > 1 and i % 500 == 0 and print("[outlier insertion] iteration " + str(i))

                # get all nodes not in tour, and store their closest distance in a tuple with <T_CITY,T_DIST> fields.
                furthest = [(j, closestDist[j]) for j in notInTour]
                # sort items by furthest->closest. We store the closest cities,
                # but out of all the closest cities we actually want the one that is the farthest
                furthest.sort(key=lambda city: city[T_DIST], reverse=True)
                # the selection of the actual index is handled by the parameter graspDistance.
                selectedIndex = graspDistance(furthest)
                # we now have a furthest city.
                furthestCity = furthest[selectedIndex][T_CITY]
                LOG and logs.write(str(tour))
                LOG and logs.write(",")

                # find the best location to insert the new city. Here the best location is the one that adds the least distance.
                bestLocationToInsert = self.findBestLocationToInsert(furthestCity, i, tour)
                # add node to tour and remove from notInTour
                tour.insert(bestLocationToInsert + 1, furthestCity)
                notInTour.remove(furthestCity)

                # the list containing the closest cities needs updating,
                # but we only need to compare it to the newly added item to the tour.
                # this optimisation saves a lot of time complexity for this function.
                for j in notInTour:
                    benchmark_iter += 1
                    if self.distMatrix[furthestCity][j] < closestDist[j]:
                        closestDist[j] = self.distMatrix[furthestCity][j]

            LOG and logs.write(str(tour))
            LOG and logs.write("]")
            print("[outlier insertion] Get Tour Outlier Insertion done with ", benchmark_iter, " iteration.")
            return tour

    def getTour_GRASPedInsertion(self, start):
        """
            define the GRASP function and call the outlier insertion.
        """

        def graspDistance(ogCandidates):
            """
            Recieves the candidate list for which node to insert into the tour sorted from best (=highest distance)
            to worst (=lowest distance)
            Then filters only the items that are at most alpha % smaller than the furthest node's value.
            Then, choose randomly, without weights.
            An improvement potential here would be to weigh the best options heavier

            Parameters
            ----------
            ogCandidates: the original candidate list

            """
            maxIndex = len(ogCandidates) - 1
            furthest = ogCandidates[0][T_DIST]
            # @source list comprehension: https://stackoverflow.com/questions/3013449/list-comprehension-vs-lambda-filter
            # calculating the candidates that are ALPHA % smaller than the furthest
            candidates = [x for x in ogCandidates if x[T_DIST] * (1 + ALPHA) >= furthest]
            # randomly select one
            selected = random.randint(0, len(candidates) - 1)
            return selected

        _ = lambda l: 0  # unused for possible future improvement of randomising the location of the insertion
        return self.getTour_OutlierInsertion_Parametrized(start, graspDistance, _)

    def getTour_OutlierInsertion(self, start):
        """
        Do Outlier Insertion with always choosing the furthest node to insert.
        """
        graspDistance = lambda l: 0
        return self.getTour_OutlierInsertion_Parametrized(start, graspDistance, lambda l: 0)

    def findBestLocationToInsert(self, furthestCity, i, tour):
        """

        Parameters
        ----------
        furthestCity
        i
        tour

        Returns
        -------

        """
        bestCostToInsert = -1
        bestLocationToInsert = None
        fauxtour = tour.copy()
        fauxtour.append(tour[0])  # creating a fake cyle to
        distMx = self.distMatrix  # attempt at improving performance by removing one accessory, speed benefit is negligable

        # calculate the best location to insert
        # if this is the first iteration, we know where to insert.
        if i == 0:
            bestLocationToInsert = 0
        else:
            for k in range(len(fauxtour) - 1):
                current = distMx[fauxtour[k], fauxtour[k + 1]]
                new = distMx[fauxtour[k], furthestCity] + distMx[furthestCity, fauxtour[k + 1]]
                diff = new - current
                if diff < bestCostToInsert or bestLocationToInsert is None:
                    bestCostToInsert = diff
                    bestLocationToInsert = k
        return bestLocationToInsert

    def computeCosts(self, tour):
        """
        Computes the costs of a tour

        Parameters
        ----------
        tour : list of integers
            order of cities.

        Returns
        -------
        costs : int
            costs of tour.

        """
        costs = 0
        # no silent errors
        if len(tour) != len(self.cities):
            raise Exception("The tour does not include all cities.")

        for i in range(len(tour) - 1):
            costs += self.distMatrix[tour[i], tour[i + 1]]

        # add the costs to complete the tour back to the start
        costs += self.distMatrix[tour[-1], tour[0]]
        return costs

    def shouldTwoOpt(self, tour):
        """
        Searches in the tour 2 links which when swapped, would total less than before.
        Returns the first nodes in the tour to swap, so (i,j) will be returned.
        If there is no such node, returns []. Does not actually execute the swapping

        Parameters
        ----------
        tour

        Returns
        -------

        """
        isOpt = []
        dmx = self.distMatrix
        t = tour
        # do not start the search for the 2-Opt every time from the beginnning, instead remember the position of the last
        # found swap (only for i) and continue from there. This allows the function to not have to iterate over parts of the 
        # tour that have already been cleared up.
        for i in range(self.twoOptSweepFrom, len(t) - 1):
            #  Calculating this and dereferencing self.distMatrix has a 10% improvement on the performance on this function
            ab_cost = dmx[t[i], t[i + 1]]
            for j in range(i + 2, len(t) - 1):
                cd_cost = dmx[t[j], t[j + 1]]
                ac_cost = dmx[t[i], t[j]]
                bd_cost = dmx[t[i + 1], t[j + 1]]
                # are the costs of the swapped edges lower than before? If yes, return the edges to be swapped
                if ab_cost + cd_cost > ac_cost + bd_cost:
                    self.twoOptSweepFrom = i
                    return [(i, j)]
        # a swap could in fact introduce another possible 2-Opt in the tour. Therefore, we cannot just sweep the tour
        # once, we have to ensure that starting from the beginning, there are no viable swaps
        if isOpt == [] and self.twoOptSweepFrom != 0:
            self.twoOptSweepFrom = 0
            self.shouldTwoOpt(tour)
        return isOpt

    def isTwoOpt(self, tour):
        """

        Parameters
        ----------
        tour

        Returns
        -------
        Boolean, whether the tour is already two-optimal
        """
        return len(self.shouldTwoOpt(tour)) == 0

    def makeTwoOpt(self, opt_tour):
        """

        Parameters
        ----------
        opt_tour

        Returns
        -------

        """
        print("[2-opt] Exchange begins")
        og_tour = opt_tour
        size = len(opt_tour)
        opt_output = [opt_tour]
        i = 0

        while i < REASONABLE_ITER:
            opt = self.shouldTwoOpt(opt_tour)

            if len(opt) == 0:
                DEBUG and print("Make Two Opt Converges in ", i, " steps, optimised from ", self.computeCosts(og_tour),
                                " to ",
                                self.computeCosts(new_tour))
                break

            anIndex = random.randint(0, len(opt) - 1)
            (first, second) = opt[anIndex]
            False and DEBUG and print("Trying to switch nodes (", opt_tour[first], opt_tour[first + 1], "),(",
                                      opt_tour[second],
                                      opt_tour[second + 1],
                                      "); #", anIndex, " out of candidates", len(opt))

            # section_first = opt_tour[0:first + 1]
            section_second = opt_tour[first + 1: second + 1]
            # section_third = opt_tour[second + 1:len(opt_tour)]
            new_tour = opt_tour[0:first + 1] + section_second[::-1] + opt_tour[second + 1:len(opt_tour)]
            # DEBUG and print(opt_tour, new_tour)
            # print(section_first, section_second, section_third)

            # if self.computeCosts(new_tour) < self.computeCosts(opt_tour):
            DEBUG and print("[2opt] Iteration " + str(i) + "; Improvement in cost: New:", self.computeCosts(new_tour),
                            "%Diff: ",
                            self.computeCosts(opt_tour) / self.computeCosts(new_tour) - 1)
            opt_tour = new_tour
            # else:
            # raise Exception("This split actually made costs go up. How?")
            opt_output.append(new_tour)

            i = i + 1
            if i >= REASONABLE_ITER:
                print("[twoOpt] Too many iterations, does not converge in " + str(REASONABLE_ITER) + " steps")
                return opt_tour
            if len(opt_tour) != len(new_tour):
                raise Exception("Inconsistent number of nodes in tour.")

        return opt_tour

    def getTour(self):
        bestTour = None

        bestTourNoOpt = None
        with open("getTour_GRASP.csv", "w", encoding="utf-8") as logs_G:
            with open("getTour.csv", "w", encoding="utf-8") as logs:
                for initialCity in range(GRASP_STARTING_POINTS):
                    best = float('inf')
                    bestNoTwoOpt = float('inf')
                    print("[getTour] starting city is ", initialCity)
                    city = self.cities[initialCity]
                    for i in range(GRASPED_ITERATIONS):
                        currentTour = self.getTour_GRASPedInsertion(city)
                        costNoTwoOpt = self.evaluateSolution(currentTour)

                        if costNoTwoOpt < bestNoTwoOpt:
                            bestNoTwoOpt = costNoTwoOpt
                            bestTourNoTwoOpt = currentTour

                        currentTour = self.makeTwoOpt(currentTour)
                        cost = self.evaluateSolution(currentTour)

                        if cost < best:
                            best = cost
                            bestTour = currentTour
                    LOG and logs.write(str(bestNoTwoOpt) + ",")
                    LOG and logs_G.write(str(best) + ",")
                    print("[getTour] best tour cost: ", best)
                    print("[getTour] best tour cost without 2Opt: ", bestNoTwoOpt)
        return bestTour

    def initGRASP(self, start):
        tour = [start]
        notInTour = self.cities.copy()
        notInTour.remove(start)


def testMultiple(cb):
    """
    Task 1: Make a selection of 5 small, 3 medium and 2 large instances
    """

    smallPrefix = "Instances/Small/"
    medPrefix = "Instances/Medium/"
    largePrefix = "Instances/Large/"
    smallFiles = list(map(lambda v: smallPrefix + v, os.listdir(smallPrefix)))
    medFiles = list(map(lambda v: medPrefix + v, os.listdir(medPrefix)))
    largeFiles = list(map(lambda v: largePrefix + v, os.listdir(largePrefix)))

    # filter out junk files
    random.shuffle([x for x in smallFiles if ".json" not in x])
    random.shuffle([x for x in medFiles if ".json" not in x])
    random.shuffle([x for x in largeFiles if ".json" not in x])
    mergedFiles = smallFiles[:SAMPLE_S_FILES] + medFiles[:SAMPLE_M_FILES] + largeFiles[:SAMPLE_L_FILES]
    totalCosts = 0
    with open(cb.__name__ + ".csv", "w", encoding="utf-8") as logs:
        for f in mergedFiles:
            if ".csv" in f:
                print("[testMultiple] calculating ", cb.__name__, " for ", f)
                cb(f, logs)


def cb_NN_MultipleStartingPoints(file, logs):
    """
    Task 2: check multiple starting positions
    to be used as a callback for test multiple
    """
    inst = TSP(file)
    LOG and logs.write("\n" + file + ", " + str(len(inst.cities)) + ",")
    for _ in range(min(NUMBER_OF_STARTING_POINTS, len(inst.cities))):
        city = random.randint(0, len(inst.cities) - 1)
        tour = inst.getTour_NN(city)
        LOG and logs.write(str(inst.evaluateSolution(tour)) + ",")


##############################################################################
# CONFIGURATION PARAMETERS
##############################################################################
GRASP_STARTING_POINTS = 5  # number of starting points to try
REASONABLE_ITER = 1000  # reasonable iterations for 2-opt to converge in.
ALPHA = 0.60  # alpha value for GRASP selection of furthest node in the graph Best is [0.1-0.25]
GRASPED_ITERATIONS = 10  # How many times should the GRASPed Outlier insertion be run
# number of samples to take from...
SAMPLE_S_FILES = 10  # ...small
SAMPLE_M_FILES = 5  # ...medium
SAMPLE_L_FILES = 5  # ...large files
NUMBER_OF_STARTING_POINTS = 30  # number of starting points to try for task 1
DEBUG = False  # should display print debug messages <== CONTROL THIS FOR MORE DETAILS
LOG = True  # should log to files
T_CITY = 0  # city position in <tuple>
T_DIST = 1  # distance position in <tuple>

##############################################################################
# RUN MOST THINGS
##############################################################################
random.seed(42)  #
print(random.random())

instFilename = "Instances/Small/berlin52.tsp"
instFilename = "Instances/Small/pr76.tsp"
# instFilename = "Instances/Medium/a280.tsp"
instFilename = "Instances/Medium/ali535.tsp"
# instFilename = "Instances/Large/d1655.tsp"
# instFilename = "Instances/Large/brd14051.tsp"
inst = TSP(instFilename)
startPointNN = 0

# tour = inst.getTour_OutlierInsertion(startPointNN)
# tour = inst.getTour_GRASPedInsertion(startPointNN)
# instFilename = "Instances/Medium/att532.tsp"
# inst.getTour(False)


# inst.initGRASP(startPointNN)

inst.getTour()
tour = inst.getTour_NN(startPointNN)
startPointNN = 0
inst.evaluateSolution(tour, True)
tour = inst.makeTwoOpt(tour)
inst.evaluateSolution(tour, True)

testMultiple(cb_NN_MultipleStartingPoints)

# evaulate a hard problem
instFilename = "Instances/Large/brd14051.tsp"
inst = TSP(instFilename)
tour = inst.getTour_GRASPedInsertion(startPointNN)
