var nodejs = (typeof window === 'undefined');
if (nodejs) {
	var TestMain = require('./main');
	var MNISTLoader = require('../utils/mnist_loader');
	var AgentSmith = require('../agent_smith/src/agent_smith');
	require('../agent_smith/src/agent_smith_cl');
}

TestMain.Tester.addTest('GMMTest', [
	{
		name : 'GMM',
		test : function(callback) {
		    var $M = AgentSmith.Matrix;
		    AgentSmithML.Mixture
		    AgentSmithML.Mixture.GMM
		    var gmm = new AgentSmithML.Mixture.GMM(2, 100, 0.0001);
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
		    gmm.fit(X);
		    //var result = kmeans.labels_;
		    //result.print();
		}
	},
]);
