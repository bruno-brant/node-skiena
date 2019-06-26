const Graph = require('./graph');
const assert = require('assert');

// Traversal ///////////////////////////////////////////////////////////////////
const g1 = Graph.parse([[1, 2]]);

assert.deepEqual(g1.getShortestPath(1, 2), [1, 2]);

// Components //////////////////////////////////////////////////////////////////
assert.equal(Graph.parse([]).getNumberOfComponents(), 0);
assert.equal(Graph.parse([[1, 1]]).getNumberOfComponents(), 1);
assert.equal(Graph.parse([[1, 2]]).getNumberOfComponents(), 1);
assert.equal(Graph.parse([[1, 2], [2, 3]]).getNumberOfComponents(), 1);
assert.equal(Graph.parse([[1, 2], [2, 3], [3, 4]]).getNumberOfComponents(), 1);
assert.equal(Graph.parse([[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]]).getNumberOfComponents(), 1);
assert.equal(Graph.parse([[0, 1], [2, 3]]).getNumberOfComponents(), 2);
assert.equal(Graph.parse([[0, 1], [1, 3], [2, 5]]).getNumberOfComponents(), 2);
assert.equal(Graph.parse([[0, 1], [2, 3], [4, 5]]).getNumberOfComponents(), 3);

// Connection //////////////////////////////////////////////////////////////////
assert.equal(Graph.parse([]).isConnected(), true);
assert.equal(Graph.parse([[1, 1]]).isConnected(), true);
assert.equal(Graph.parse([[1, 2]]).isConnected(), true);
assert.equal(Graph.parse([[1, 2], [2, 3]]).isConnected(), true);
assert.equal(Graph.parse([[1, 2], [2, 3], [3, 4]]).isConnected(), true);
assert.equal(Graph.parse([[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]]).isConnected(), true);
assert.equal(Graph.parse([[0, 1], [2, 3]]).isConnected(), false);
assert.equal(Graph.parse([[0, 1], [1, 3], [2, 5]]).isConnected(), false);

// Bipartition /////////////////////////////////////////////////////////////////
assert.equal(Graph.parse([]).isBipartite(), true);
assert.equal(Graph.parse([[1, 1]]).isBipartite(), true);
assert.equal(Graph.parse([[1, 2]]).isBipartite(), true);
assert.equal(Graph.parse([[1, 2], [2, 3]]).isBipartite(), true);
assert.equal(Graph.parse([[1, 2], [2, 3], [3, 4]]).isBipartite(), true);
assert.equal(Graph.parse([[0, 1], [0, 2], [0, 3], [0, 4], [1, 10], [1, 11]]).isBipartite(), true);
assert.equal(Graph.parse([[0, 1], [1, 2], [2, 0]]).isBipartite(), false);
assert.equal(Graph.parse([[0, 1], [0, 2], [0, 3], [0, 4], [1, 4]]).isBipartite(), false);

// Articulation vertices ///////////////////////////////////////////////////////
assert.deepEqual(Graph.parse([]).articulationVertices(), []);

const edgeList1 = [
	[1,2],
	[2,3]
];


console.log('success');
