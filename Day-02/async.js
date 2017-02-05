var pgm = (function(){
	function addSync(x,y){
		console.log('	[Service] addSync started');
		var result = x + y;
		console.log('	[Service] addSync completed');
		return result;
	}

	function addSyncClient(x,y){
		console.log('[Consumer] triggering addSync');
		var result = addSync(x,y);
		console.log('[Consumer] result = ', result);
	}

	function addAsync(x,y, onResult){
		console.log('	[Service] addAsync started');
		setTimeout(function(){
			var result = x + y;
			console.log('	[Service] addAsync completed');
			if (typeof onResult === 'function')
				onResult(result);
		}, 5000);
	}

	function addAsyncClient(x,y){
		console.log('[Consumer] triggering addAsync');
		addAsync(x,y, function(result){
			console.log('[Consumer] result = ', result);
		});
		
	}

	function addAsyncPromise(x,y){
		console.log('	[Service] addAsyncPromise started');

		var promise = new Promise(function(resolveFn, rejectFn){
			setTimeout(function(){
				var result = x + y;
				console.log('	[Service] addAsync completed');
				resolveFn(result);
			}, 5000);
		});
		return promise;
	}

	function addAsyncDeferred(x,y){
		console.log('	[Service] addAsyncPromise started');

		var deffered = $.Deferred();
		setTimeout(function(){
			var result = x + y;
			console.log('	[Service] addAsync completed');
			deffered.resolve(result);
		}, 5000);
	
		return deffered.promise();
	}

	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient,
		addAsyncPromise : addAsyncPromise,
		addAsyncDeferred : addAsyncDeferred
	}
})();

/*

var promise = pgm.addAsyncPromise(100,200);

[Service] addAsyncPromise started

[Service] addAsync completed
promise.then(function(result){
   console.log('[Consumer] result = ', result);
   return result * 2;
})
[Consumer] result =  300
Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: 600}
var p2 = promise.then(function(result){
   console.log('[Consumer] result = ', result);
   return result * 2;
})
[Consumer] result =  300

var p3 = p2.then(function(result){
   console.log('[Consumer] double result = ', result);
})
[Consumer] double result =  600
*/