var nodejs = (typeof window === 'undefined');

if (nodejs) {
    var AgentSmith = require('../../agent_smith/src/agent_smith');
    var AgentSmithML = require('../agent_smith_ml');
    require('./utils');
}

var $M = AgentSmith.Matrix;

AgentSmithML.Utils.Statistics = {
    cov : function(X){
	var n_samples = X.rows;
	var mean = $M.sumEachCol(X).times( 1.0 / n_samples );
	X = $M.sub(X, mean);
	return $M.mul(X.t(), X).times( 1.0 / (n_samples - 1) )
    }  
};

