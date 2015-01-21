var nodejs = (typeof window === 'undefined');
if (nodejs) {
	var TestMain = require('../main');
	var AgentSmith = require('../../agent_smith/src/agent_smith');
	require('../../agent_smith/src/agent_smith_cl');
	
	var Neo = require('../../src/neo');
	require('../../src/cluster/cluster');
	require('../../src/cluster/k_means');
}

TestMain.Tester.addTest('KmeansTest', [
	{
		name : 'Kmeans initialize algorithm kmeans++',
		test : function(callback) {
		    var $M = AgentSmith.Matrix;
		    var kmeans = new Neo.Cluster.Kmeans(n_clusters=2,  init="kmeans++");
		    var X = $M.fromArray([
			[1, 1, 3],
			[0, 1, 1],
			[1, 1, 0],
			[1, 2, 1],
			[1, 2, -1],
			[9, 7, 8],
			[13, 10, 11],
			[10, 7, 8],
			[8, 11, 9],
			[9, 7, 8],
		    ]);
		    kmeans.fit(X);
		    var result = kmeans.labels_;
		    result.print();
		    if (result.nearlyEquals($M.fromArray([[0],[0],[0],[0],[0],[1],[1],[1],[1],[1]])) === true){
                        return true;
		    }
		    if (result.nearlyEquals($M.fromArray([[1],[1],[1],[1],[1],[0],[0],[0],[0],[0]])) === true){
                        return true;
                    }
		    return false;
		}
	},
	{
		name : 'Kmeans initialize algorithm random',
		test : function(callback) {
		    var $M = AgentSmith.Matrix;
		    var kmeans = new Neo.Cluster.Kmeans(n_clusters=2,  init="random");
		    var X = $M.fromArray([
			[1, 1, 3],
			[0, 1, 1],
			[1, 1, 0],
			[1, 2, 1],
			[1, 2, -1],
			[9, 7, 8],
			[13, 10, 11],
			[10, 7, 8],
			[8, 11, 9],
			[9, 7, 8],
		    ]);
		    kmeans.fit(X);
		    var result = kmeans.labels_;
		    result.print();
		    if (result.nearlyEquals($M.fromArray([[0],[0],[0],[0],[0],[1],[1],[1],[1],[1]])) === true){
                        return true;
		    }
		    if (result.nearlyEquals($M.fromArray([[1],[1],[1],[1],[1],[0],[0],[0],[0],[0]])) === true){
                        return true;
                    }
		    return false;
		}
	},
    {
	name : 'Kmeans raise error clusternum',
	test : function(callback) {
	    var $M = AgentSmith.Matrix;
		    var kmeans = new Neo.Cluster.Kmeans(n_clusters=5,  init="kmeans++");
		    var X = $M.fromArray([
			[1, 1, 3],
			[0, 1, 1],
			[1, 1, 0],
		    ]);
	    try{
		kmeans.fit(X);
	    }catch(e){
		return true;
	    }
	    return false
	}
    }
]);
