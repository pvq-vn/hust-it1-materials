import sys


class TSP2Opt:
    def __init__(self, d, pre_lst):
        self.d = d
        self.pre_lst = pre_lst
        self.n = len(d)
        self.x = [i + 1 for i in range(self.n)]
        self.x[self.n - 1] = 0
        self.dr = [0 for i in range(self.n)]
        self.dl = [0 for i in range(self.n)]
        self.distance = 0
        self.start = 0
        self.Propagate()

    def Propagate(self):
        self.dr[0] = 0
        self.dl[0] = 0
        i = self.start
        self.distance = 0
        while self.x[i] != self.start:
            self.dr[self.x[i]] = self.dr[i] + d[i][self.x[i]]
            self.dl[self.x[i]] = self.dl[i] + d[self.x[i]][i]
            self.distance += self.d[i][self.x[i]]
            i = self.x[i]
        self.distance += self.d[i][self.start]
        
    def TwoOptMove(self, u, v):
        nu = self.x[u]
        nv = self.x[v]
        p = nu
        pp = -1
        np = -1
        while p != nv:
            np = self.x[p]
            self.x[p] = pp
            pp = p
            p = np
        self.x[u] = v
        self.x[nu] = nv
        self.Propagate()

    def getDistance(self):
        return self.distance

    def is_valid_2opt_move(self, u, v):
        nu = self.x[u]
        nv = self.x[v]
        p = nu
        segment = []
        while p != nv:
            segment.insert(0, p)
            p = self.x[p]
        for [i, j] in self.pre_lst:
            if i not in segment or j not in segment: continue
            if segment.index(i) > segment.index(j):
                return False
        return True

    def Get2OptDelta(self, u, v):
        nu = self.x[u]
        nv = self.x[v]
        duv = self.dr[v] - self.dr[nu]
        dvu = self.dl[v] - self.dl[nu]
        d1 = self.d[u][v] + self.d[nu][nv] - self.d[u][nu] - self.d[v][nv]
        d2 = dvu - duv
        return d1 + d2

    def nearestNeighbor(self, start):
        route = []
        cur = start
        cand = set()
        visited = [False for i in range(self.n)]
        L = 0
        for i in range(self.n):
            if i != start:
                cand.add(i)
        route.append(start)
        visited[start] = True
        if not all(visited[pre] for pre in range(self.n) if [pre, start] in self.pre_lst):
            return None, 1e9
        while True:
            minD = 1e9
            sel = -1
            for i in range(self.n):
                if visited[i]:
                    continue
                if self.d[cur][i] < minD \
                        and all(visited[pre] for pre in range(self.n) if [pre, i] in self.pre_lst):
                    minD = self.d[cur][i]
                    sel = i
            if sel == -1:
                break

            cand.remove(sel)
            route.append(sel)
            visited[sel] = True
            L += self.d[cur][sel]
            cur = sel
        L += self.d[cur][start]
        return route, L

    def GenInitialSolution(self):
        minL = 1e9
        best_route = None
        best_route, minL = self.nearestNeighbor(0)
        for start in range(1, self.n):
            route, L = self.nearestNeighbor(start)
            if L < minL:
                minL = L
                best_route = route

        self.start = best_route[0]
        cur = self.start
        for i in best_route:
            if i != self.start:
                self.x[cur] = i
                cur = i
        self.x[cur] = self.start
        self.Propagate()

    def solve(self, maxIter):
        self.GenInitialSolution()

        for iter in range(maxIter):
            u = 0
            minDelta = 1e9
            sel_u = -1
            sel_v = -1
            while self.x[u] != self.start:
                v = self.x[u]
                while v != self.start:
                    if self.is_valid_2opt_move(u, v):
                        delta = self.Get2OptDelta(u, v)
                        if delta < minDelta:
                            minDelta = delta
                            sel_u = u
                            sel_v = v
                    v = self.x[v]
                u = self.x[u]
            if minDelta >= 0:
                break
            self.TwoOptMove(sel_u, sel_v)
        sys.stdout.write(str(self.n) + "\n")
        cur = self.start
        while self.x[cur] != self.start:
            sys.stdout.write(str(cur + 1) + " ")
            cur = self.x[cur]
        sys.stdout.write(str(cur + 1))


def input():
    [n] = [int(x) for x in sys.stdin.readline().split()]
    d = []
    pre_lst = []
    for i in range(n):
        r = [int(x) for x in sys.stdin.readline().split()]
        d.append(r)
    m = int(sys.stdin.readline())
    for i in range(m):
        r = [int(x)-1 for x in sys.stdin.readline().split()]
        pre_lst.append(r)
    return d, pre_lst

d, pre_lst = input()

app = TSP2Opt(d, pre_lst)
app.solve(1000)
