# -*- coding: utf-8 -*-
"""
@author: Rolf van Lieshout
"""

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
    def getDistance(c1, c2):
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
        for line in f.readlines()[6:-1]:  # start reading from line 7, skip last line
            asList = line.split()
            floatList = list(map(float, asList))

            id = int(floatList[0]) - 1  # convert to int, subtract 1 because Python indices start from 0
            x = floatList[1]
            y = floatList[2]

            c = Point2D(id, x, y)
            points.append(c)
        f.close()

        print("Read in all points, start computing distance matrix")

        self.points = points
        self.nCities = len(points)
        self.cities = list(range(self.nCities))

        # compute distance matrix, assume Euclidian TSP
        self.distMatrix = np.zeros((self.nCities, self.nCities))  # init as nxn matrix
        for i in range(self.nCities):
            for j in range(i + 1, self.nCities):
                distItoJ = Point2D.getDistance(points[i], points[j])
                self.distMatrix[i, j] = distItoJ
                self.distMatrix[j, i] = distItoJ

        print("Finished computing distance matrix")

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

        # print("Start computing NN tour")
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

        # print("Finished computing NN tour")

        return tour


    def getCitiesCopy(self):
        return self.cities.copy()

    def evaluateSolution(self, tour, echo=False):
        if echo:
            print(tour)

        if self.isFeasible(tour):
            costs = self.computeCosts(tour)
            print("The solution is feasible with costs " + str(costs))
            return costs
        else:
            print("The solution is infeasible")
            return None

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
            print("Length of tour incorrect")
            return False
        else:
            # check if all cities in the tour
            for city in self.cities:
                if city not in tour:
                    return False
        return True

    def getTour_OutlierInsertion(self, start):
        """
        In this assignment, you will develop and implement a Greedy Randomized Adaptive Search
        Procedure (GRASP) based on outlier insertion to solve the Traveling Salesman Problem (TSP).
        After selecting an initial city, the algorithm creates a tour by joining it with the city with the
        largest distance from the initial city. Then, in each iteration, among all cities not in the tour,
        we choose the city the furthest to any city in the tour. Finally, we insert the selected city in
        the position that causes the smallest increase in tour length. Figure 1 illustrates this outlier
        insertion heuristic for a small TSP instance.
        """
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

        print("[")
        # print("Start computing NN tour")
        for i in range(self.nCities - 1):
            curCity = tour[i]
            furthestDist = -1  # initialize with -1
            furthestCity = None  # initialize with None

            # find closest city not yet in tour
            for j in notInTour:
                dist = self.distMatrix[curCity][j]
                if dist > furthestDist or furthestCity is None:
                    # update the closest city and distance
                    furthestDist = dist
                    furthestCity = j

            # we now have a furthest city
            print(tour)
            print(",")
            tour.append(furthestCity)
            notInTour.remove(furthestCity)

        # print("Finished computing NN tour")
        print("[]]")
        return tour


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
        for i in range(len(tour) - 1):
            costs += self.distMatrix[tour[i], tour[i + 1]]

        # add the costs to complete the tour back to the start
        costs += self.distMatrix[tour[-1], tour[0]]
        return costs

    def initGRASP(self, start):
        tour = [start]
        notInTour = self.cities.copy()
        notInTour.remove(start)


def testMultiple(cb):
    """
    Task 1: Make a selection of 5 small, 3 medium and 2 large instances
    # TODO MAKE SEEDED-RANDOM
    """
    smallPrefix = "Instances/Small/"
    medPrefix = "Instances/Medium/"
    largePrefix = "Instances/Large/"
    smallFiles = map(lambda v: smallPrefix + v, os.listdir(smallPrefix)[:5])
    medFiles = map(lambda v: medPrefix + v, os.listdir(medPrefix)[:3])
    largeFiles = map(lambda v: largePrefix + v, os.listdir(largePrefix)[:2])

    totalCosts = 0
    with open(cb.__name__ + ".csv", "w", encoding="utf-8") as logs:
        for f in largeFiles:
            cb(f, logs)


def _task2_NN_heuristic_for_starting_positions(file, logs):
    """
    Task 2: check multiple starting positions
    """
    inst = TSP(file)
    logs.write("\n" + file + " ")
    for _ in range(min(10, len(inst.cities))):
        city = random.randint(0, len(inst.cities) - 1)
        tour = inst.getTour_NN(city)
        logs.write(str(inst.evaluateSolution(tour)) + " ")


##############################################################################

NUMBER_OF_STRARTING_POINTS = 10
random.seed(42)
print(random.random())

instFilename = "Instances/Small/berlin52.tsp"
inst = TSP(instFilename)
startPointNN = 0
tour = inst.getTour_NN(startPointNN)
tour = inst.getTour_OutlierInsertion(startPointNN)
inst.evaluateSolution(tour,True)

inst.initGRASP(startPointNN)

print(inst.points)

#testMultiple(_task2_NN_heuristic_for_starting_positions)
