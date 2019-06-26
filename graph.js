/** Function that does nothing, used as a parameter for BFS and DFS */
function nullFn() { }



/** Represents a graph  */
class Graph {
	/**
	 * Initializes a new graph.
	 * @param {boolean} directed Informs whether the graph is directed or not
	 */
	constructor(directed = false) {

		this.directed = directed;
		/**
		 * List of edges for a given node. 
		 * @type {number[][]} 
		 */
		this.edges = [];
	}

	/**
	 * Parse a list of edges into the graph. 
	 * Preferrably used on new graphs.
	 * @param {boolean} directed Informs whether the graph is directed.
	 * @param {number[][]} edgelist List of pairs of integers that identifies edges.
	 * @returns {Graph} Graph initialized with edgelist
	 */
	static parse(edgelist, directed = false) {
		let g = new Graph(directed);
		for (const edge of edgelist) {
			g.addEdge(edge[0], edge[1]);
		}

		return g;
	}

	/**
	 * Adds an edge to the graph.
	 * @param {number} x The origin of the edge
	 * @param {number} y The destination of the edge
	 */
	addEdge(x, y) {
		this._ensureInitialized(x);
		this.edges[x].push(y);

		if (!this.directed) {
			this._ensureInitialized(y);
			this.edges[y].push(x);
		}
	}

	/**
	 * Get a list of neighboring vertices for {@param vertext}
	 * @param {number} vertex The vertex that has neighbors
	 * @returns {number[]} List of neighbors of {@param vertex}
	 */
	getNeighbors(vertex) {
		this._ensureInitialized(vertex);
		return this.edges[vertex];
	}

	/**
	 * Find the shortest path between x and y using BFS.
	 * @param {number} x The origin vertex
	 * @param {number} y The destination vertex
	 * @return {number[]} A list of vertices that forms a path between x and y.
	 */
	getShortestPath(x, y) {
		const { parents } = this.bfs(x);
		const path = [];
		let cursor = y;
		while (cursor != null) {
			path.push(cursor);
			cursor = parents[cursor];
		}

		return path.reverse();
	}


	/** 
	 * Checks whether the graph is connected (has a single component)
	 * @returns {boolean} True if the graph is connected, false otherwise.
	 */
	isConnected() {
		return this.getNumberOfComponents() <= 1;
	}

	/**
	 * Gets the total number of components of this graph.
	 * @returns {number} The number of components in the graph.
	 */
	getNumberOfComponents() {
		let processed = [];
		let components = 0;
		for (let vertex = 0; vertex < this.edges.length; vertex++) {
			if (this.edges[vertex] == null) continue; // vertex doesn't exists!
			if (processed[vertex] != true) {
				components++;
				processed[vertex] = true;
				this.bfs(vertex, x => processed[x] = true);
			}
		}

		return components;
	}

	/** 
	 * Checks whether the graph is bipartite 
	 * @returns {boolean} True if the graph is bipartite, false otherwise.
	 */
	isBipartite() {
		/** we will use this vector to hold the color as well as the state of processing */
		const processed = [];

		/** this flag will tell wether the graph is bipartite */
		let bipartite = true;

		/** check if the coloring is correct and then assign a color for y */
		const checkColor = (x, y) => {
			if (processed[x] == processed[y]) {
				bipartite = false;
			}

			processed[y] = processed[x] == 0 ? 1 : 0;

			return undefined;
		};

		for (let vertex = 0; vertex < this.edges.length; vertex++) {
			if (!bipartite) return false; // no need to continue if the conflict has already ocurred
			if (this.edges[vertex] == null) continue; // vertex doesn't exists!

			if (processed[vertex] == null) { // not yet processed
				processed[vertex] = 0;
				this.bfs(vertex, nullFn, nullFn, checkColor);
			}
		}

		return bipartite;
	}

	/**
	 * Retrieves all articulation vertices from the graph.
	 * @returns {number[]} List of articulation vertices.
	 */
	articulationVertices() {
		return [];
	}

	/**
	 * Makes sure a certain vertex has been initialized.
	 * @param {number} x Index of the vertex to be properly initialized
	 */
	_ensureInitialized(x) {
		if (!this.edges[x]) this.edges[x] = [];
	}

	/**
	 * Performs a Breadth-first serch on the graph from vertex root.
	 * @param {number} root The root vertex for the search.
	 * @param {(x: number) => void} processVertexEarly Called just before a vertex is processed
	 * @param {any} processVertexLate Called after a vertex is fully processed
	 * @param {(x: number, y: number) => void} processEdge Called when a edge is processed
	 * @returns Structure containing the parents vector, the list of discovered and processed edges.
	 */
	bfs(root, processVertexEarly = nullFn, processVertexLate = nullFn, processEdge = nullFn) {

		/** @type {number[]} */
		const parents = [];
		/** @type {boolean[]} */
		const discovered = [];
		/** @type {boolean[]} */
		const processed = [];

		let queue = [root];
		discovered[root] = true;

		while (queue.length > 0) {
			let v = queue.shift();

			processVertexEarly(v);
			processed[v] = true;

			for (const y of this.getNeighbors(v)) {
				if (!processed[y] || this.directed) {
					processEdge(v, y);
				}

				if (!discovered[y]) {
					queue.push(y);
					discovered[y] = true;
					parents[y] = v;
				}
			}

			processVertexLate(v);
		}

		return {
			parents,
			discovered,
			processed
		}
	}
}

module.exports = Graph;
