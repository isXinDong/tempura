var nodejs = (typeof window === 'undefined');
if (nodejs) {
	var TestMain = require('./main');
	var MNISTLoader = require('../utils/mnist_loader');
	var AgentSmith = require('../agent_smith/src/agent_smith');
	require('../agent_smith/src/agent_smith_cl');
}

TestMain.Tester.addTest('KmeansTest', [
	{
		name : 'Kmeans',
		test : function(callback) {
		    var $M = AgentSmith.Matrix;
		    var kmeans = new AgentSmithML.Cluster.Kmeans(n_clusters=2,  init="kmeans++");
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
		    var result = kmeans.assigned_class;
		    console.log(kmeans.assigned_class);
		    console.log(result)
		    if (result.nearlyEquals($M.fromArray([[0],[0],[0],[0],[0],[1],[1],[1],[1],[1]])) === true){
                        return true;
		    }
		    if (result.nearlyEquals($M.fromArray([[1],[1],[1],[1],[1],[0],[0],[0],[0],[0]])) === true){
                        return true;
                    }
		    return false;

		}
	},
]);
