var nodejs = (typeof window === 'undefined');
if (nodejs) {
	var TestMain = require('../main');
	var AgentSmith = require('../../agent_smith/src/agent_smith');
	require('../../agent_smith/src/agent_smith_cl');
	var AgentSmithML = require('../../src/agent_smith_ml');
	require('../../src/linear_model/linear_model');
	requre('../../src/linear_model/base.js');
	require('../../src/linear_model/logistic');
}

TestMain.Tester.addTest('LogisticTest', [
									   {
										   name : 'Logistic',
											   test : function(callback) {
											   var $M = AgentSmith.Matrix;
											   var logistic = new AgentSmithML.LinearModel.Logistic();

											   var X = $M.fromArray( [[0, 4, 3],
																	  [1, 5, 1],
																	  [2, 8, 2],
																	  [3, 5, 6]] );
											   var y = $M.fromArray( [[1],
																	  [-1],
																	  [1],
																	  [-1]] );
											   var sample = $M.fromArray( [[3, 3, 6],
																	  [2, 8, 2],
																	  [-2, 6, -3]] );

											   logistic.fit(X,y);
											   var pred = logistic.predict(sample);
											   console.log('weight');
											   logistic.weight.print();
											   pred.print();
											   if (pred.nearlyEquals($M.fromArray( [[-2.29, 2.60],
																					[1.23, -0.64],
																					[3.72, 0.82]] ))) {
												   return true;
											   }
											   return false;

										   }
									   },

												 ]);