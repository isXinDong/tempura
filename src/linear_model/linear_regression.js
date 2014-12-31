(function() {

	// namespace
	if (typeof AgentSmithML.LinearModel.LinearRegression !== 'undefined') {
		return;
	}

	// node
	var nodejs = (typeof window === 'undefined');
	if (nodejs) {
		require('../../../agent_smith/src/agent_smith');
		require('../agent_smith_ml');
		require('./linear_model');
		require('./base');
	}
	var $M = AgentSmith.Matrix;
	var $Base = AgentSmithML.LinearModel.Base;


	/* --- linear regression --- */

	// init
    AgentSmithML.LinearModel.LinearRegression = function(args) {
		this.center = (typeof args.center === 'undefined') ? true : args.center;
		this.normalize = (typeof args.normalize === 'undefined') ? flase : args.normalize;
	};
	var $LinReg = AgentSmithML.LinearModel.LinearRegression.prototype;

	// fit
	$LinReg.fit = function(X, y) {
		// check data property
		$Base.checkArgc( arguments.length, 2 );
		var instList = [X,y];
		$Base.checkInstance( instList );
		$Base.checkSampleNum( instList );
		$Base.checkHasData( instList );
		$Base.checkHasNan( instList );
		// make data centered
		var meanStd = $Base.meanStd( this.center, this.normalize, X, y);
		// nomal equation
		var tmp = $M.mul( X.t(), X);
		var w = $M.mul( $M.mul( tmp.inverse(), X.t() ), y );
		// store variables
		this.weight = (this.center) ? $M.divEach( w, meanStd.X_std.t() ) : w;
		if (this.center) {
			this.intercept = $M.sub(meanStd.y_mean, $M.mul(meanStd.X_mean, w));
		} else {
			var tmp = new $M( 1, y.cols );
			this.intercept = tmp.zeros();
		}

		X.print()
		y.print()
		return this
	};


	// predict
	$LinReg.predict = function(X) {
		// check data property
		var instList = [X];
		$Base.checkInstance( instList );
		$Base.checkDataDim( X, this.weight );
		$Base.checkHasData( instList );
		$Base.checkHasNan( instList );
		// estimate
		var pred = $M.add( $M.mul( X, this.weight ),  this.intercept );
		return pred
	};

})();


var nodejs = (typeof window === 'undefined');
if (nodejs) {
	module.exports = AgentSmithML.LinearModel.LinearRegression;
}