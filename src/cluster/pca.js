(function() {
    if (typeof AgentSmithML !== 'undefined' && typeof AgentSmithML.PCA !== 'undefined') {
        return;
    }
    AgentSmithML = {};
    AgentSmithML.PCA = function(n_components) {
	if(n_components === undefined) n_components = 10;
	this.n_components = n_components;
    };
    //var $M = AgentSmith.Kmeans;    
    var $M = AgentSmith.Matrix;

    AgentSmithML.PCA.prototype.fit = function(){
	console.log("PCA\ncomponents : %d", this.n_components);
	var samples = $M.fromArray([
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

	
	var n_samples = samples.rows;
	var n_features = samples.cols;
	console.log("n_samples : " + n_samples + ", n_features : " + n_features);
	console.log("====== start calculating PCA ======");
	var sample_mean = $M.sumEachCol(samples).times(1.0 / n_samples);
	var dist = $M.sub(samples, sample_mean);
	console.log($M.sub(samples, sample_mean).data);
	console.log(dist);
	var covariance = $M.mul(dist.t(), dist).times(1.0 / n_samples);
	console.log(covariance.data);
	var newArr = [];
	while(covariance.data.length) newArr.push(covariance.data.slice(0,covariance.rows));
	var B = numeric.eig(newArr);
	convole.log(B);
	console.log('====== end calculation ======');
	console.log()
	console.log("assigned class");
	console.log();
	}
    
    function calc_new_mean(n_features, mean_class, datanum_hist, sample, cls_ind){
	var cls_datanum = datanum_hist.data[cls_ind];
	var old_cls_mean = get_row(mean_class, cls_ind);
	var old_cls_sum = old_cls_mean.times(cls_datanum)
	var new_cls_sum = $M.add(old_cls_sum , sample)
	var tmp_row = new $M(1, n_features);
	tmp_row.zeros(cls_datanum + 1);
	var new_cls_mean = $M.divEach(new_cls_sum, tmp_row); 
	return new_cls_mean
    }

    function init_clusters(n_clusters, samples){
	console.log("initializing cluster ...")
	var n_samples = samples.rows;
	var n_features = samples.cols;
	var assigned_class = new $M(n_samples, 1);
	var mean_class = new $M(n_clusters, n_features);
	var datanum_hist = new $M(n_clusters, 1);
	assigned_class.zeros(-1);
	mean_class.zeros();
	datanum_hist.zeros();
//	var init_sample_ind = _.sample(_.range(n_samples), n_clusters);
	var init_sample_ind = [0 , 8];
	for(var c=0; c<n_clusters; c++){ 
	    var index = init_sample_ind[c];
	    assigned_class.data[index] = c;
	    datanum_hist[c] += 1;
	    set_row(mean_class, get_row(samples, index), c);
	}
	return [mean_class, assigned_class, datanum_hist]
    }


    function get_row(samples, i){
	cols = samples.cols;
	newArr = new $M(1, cols);
	newArr.zeros();
	for(var j=0; j<cols; j++){
	    newArr.data[j] = samples.data[i*cols + j];
	}
	return newArr
    }

    function set_row(samples, row, i){
	cols = samples.cols;
	for(var j=0; j<cols; j++){
	    samples.data[i*cols + j] = row.data[j];
	}
	return samples
    }

    function euclidian_distance(mat1, mat2){
	//console.log("EUC" + mat1 + '\n' + mat2 + '\n' + $M.sub(mat1, mat2));
	var submat = $M.sub(mat1, mat2);
	var dist = $M.sumEachRow($M.mulEach(submat, submat));
	return dist
    }

    var pca = new AgentSmithML.PCA(2);
    pca.fit();

})();

var nodejs = (typeof window === 'undefined');
if (nodejs) {
    module.exports = AgentSmithML;
}


