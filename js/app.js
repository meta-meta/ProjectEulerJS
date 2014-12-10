$(function() {
	var functions = [];

	function eulerProblem(number, title, description, fn) {
		functions.push(fn);
		var html = '' +
		'<div class="eulerProblem">' + 
		'	<h2 class="problem">Problem '+ number + '</h2>' +
		'	<h4 class="title">' + title + '</h4>' + 
		'	<h5 class="description">' + description + '</h5>' + 
		'	<button>Show Solution</button>' +
		'	<div class="solution" style="display:none">' +
		'		<pre><code class="language-javascript">' + fn + '</code></pre>' + 
		'		<h4 class="resultLabel">result: </h4><h3 class="result"></h3><br>' +
		'		<h4 class="timingLabel">calculated in: </h4><h3 class="timing"></h3>' +
		'	</div>' +
		'</div>';

		$('body').append(html);
	}

	function wireButtons() {
		$('.eulerProblem').each(function(i, el) {
			var $el = $(el);
			$el.find('button').click(function (e) {
				var t = Date.now();
				var res = functions[i]();
				var ellapsedMillis = Date.now() - t;
				
				$el.find('.result').html(res);
				$el.find('.timing').html(ellapsedMillis + ' milliseconds');

				$el.find('.solution').slideDown(500);				
			});
		})
	}

	eulerProblem(1, 'Multiples of 3 and 5',
		'If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23. Find the sum of all the multiples of 3 or 5 below 1000.',
		function() { 
			return _.chain(_.range(3, 1000))
			.filter( function(x) { return x % 3 == 0 || x % 5 == 0; } )
			.reduce( function(acc, x) { return x + acc; } )
			.value();
		});

	eulerProblem(2, 'Even Fibonacci numbers',
		'Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be: <br>' +
		'1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ... <br>' +
		'By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.',
		function() { 
			function sum(a, b) {
				return a + b;
			}

			var seq = [1,2]; 

			while(_.last(seq) <= 4000000) {
				var next = _.chain(seq)
				.last(2)
				.reduce(sum)
				.value();
				
				seq.push(next);	
			}					

			return _.chain(seq)
			.initial()
			.filter( function(x) { return x % 2 == 0; } )
			.reduce(sum)
			.value();
		});

	eulerProblem(3, 'Largest prime factor',
		'The prime factors of 13195 are 5, 7, 13 and 29. <br> ' + 
		'What is the largest prime factor of the number 600851475143 ?',
		function() { 
			function isPrime(n) {
				if(n < 2) return false;
				if(n == 2) return true;
				return _.chain(_.range(2, Math.sqrt(n) + 1))
				.filter(function(x){ return n % x == 0; })
				.isEmpty()
				.value();
			}

			var bigN = 600851475143;			
			var n;
			for(n = 2; !(bigN % n == 0 && isPrime(bigN / n)); ++n) {}
			return bigN / n;
		});

	eulerProblem(4, 'Largest palindrome product',
		'A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99. <br> ' + 
		'Find the largest palindrome made from the product of two 3-digit numbers.',
		function() { 
			function isPalindrome(n) {
				var arr = ('' + n).split('');
				var halfLen = Math.floor(arr.length / 2);
				return _.isEqual(_.first(arr, halfLen), _.last(arr, halfLen).reverse());
			}
					
			var largestY = 99;
			var largestPal = 0;
			for(x = 999; x > largestY; x--){
				for(y = 999; y > 99; y--){
					var test = x * y;
					if(isPalindrome(test) && y > largestY) {
						largestY = y;
						if(test > largestPal) largestPal = test;
					}
				}
			}			
			return largestPal;
		});

	eulerProblem(5, 'Smallest multiple',
		'2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder. <br> ' + 
		'What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?',
		function() {
			var n = 2520;
			
			while(!_.reduce(_.range(11, 21), function(acc, x){ return n % x == 0 && acc }, true)) {
				n += 20;
			}

			return n;
		});

	eulerProblem(6, 'Smallest multiple',
		'The sum of the squares of the first ten natural numbers is, <br> ' + 
		'1<sup>2</sup> + 2<sup>2</sup> + ... + 10<sup>2</sup> = 385 <br> ' + 
		'The square of the sum of the first ten natural numbers is, <br> ' + 
		'(1 + 2 + ... + 10)<sup>2</sup> = 55<sup>2</sup> = 3025 <br> ' + 
		'Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640. <br> ' + 
		'Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.',
		
		function() {
			var sumOfSquares = _.reduce(_.range(1, 101), function(acc, x){ return acc + x * x; });
			var sums = _.reduce(_.range(1, 101), function(acc, x){ return acc + x; });
			var squareOfSums = sums * sums;
			return squareOfSums - sumOfSquares;
		});

	eulerProblem(7, '10001st prime', 
		'By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13. <br> ' + 		
		'What is the 10 001st prime number?',
		
		function() {
			function isPrime(n) {
				return _.chain(_.range(2, Math.sqrt(n) + 1))
				.filter(function(x){ return n % x == 0; })
				.isEmpty()
				.value()
			}

			var numPrimes = 1;
			var n = 2;			
			
			while(numPrimes < 10001) {
				n++;
				if(isPrime(n)) numPrimes++;
			}

			return n;			
		});

	eulerProblem(8, 'Largest product in a series', 
		'The four adjacent digits in the 1000-digit number that have the greatest product are 9 × 9 × 8 × 9 = 5832. <br> ' + 
		'73167176531330624919225119674426574742355349194934 <br>' +
		'96983520312774506326239578318016984801869478851843 <br>' +
		'85861560789112949495459501737958331952853208805511 <br>' +
		'12540698747158523863050715693290963295227443043557 <br>' +
		'66896648950445244523161731856403098711121722383113 <br>' +
		'62229893423380308135336276614282806444486645238749 <br>' +
		'30358907296290491560440772390713810515859307960866 <br>' +
		'70172427121883998797908792274921901699720888093776 <br>' +
		'65727333001053367881220235421809751254540594752243 <br>' +
		'52584907711670556013604839586446706324415722155397 <br>' +
		'53697817977846174064955149290862569321978468622482 <br>' +
		'83972241375657056057490261407972968652414535100474 <br>' +
		'82166370484403199890008895243450658541227588666881 <br>' +
		'16427171479924442928230863465674813919123162824586 <br>' +
		'17866458359124566529476545682848912883142607690042 <br>' +
		'24219022671055626321111109370544217506941658960408 <br>' +
		'07198403850962455444362981230987879927244284909188 <br>' +
		'84580156166097919133875499200524063689912560717606 <br>' +
		'05886116467109405077541002256983155200055935729725 <br>' +
		'71636269561882670428252483600823257530420752963450 <br>' +
		'Find the thirteen adjacent digits in the 1000-digit number that have the greatest product. What is the value of this product?',
		
		function() {
			var num = '7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450';
			var largestSubstr;
			var largestProduct = 0;
			for(var i=0; i <= num.length - 13; ++i) {
				var subStr = num.substr(i, 13);
				var product = _.reduce(subStr.split(''), function(a, b){ return a * b; });
				if(product > largestProduct) {
					largestProduct = product;
					largestSubstr = subStr;
				}
			}

			return largestProduct;
		});

	eulerProblem(9, 'Special Pythagorean triplet',
		'A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,<br>' +
		'a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup><br>' +
		'For example, 3<sup>2</sup> + 4<sup>2</sup> = 9 + 16 = 25 = 5<sup>2</sup>.<br>' +
		'There exists exactly one Pythagorean triplet for which a + b + c = 1000.<br>' +
		'Find the product abc.',

		function() {
			for(var a = 1; a < 1000; a++) {
				for(var b = a; b < 1000; b++) {
					var c = Math.sqrt(a * a + b * b);
					if(a + b + c == 1000) {
						return a * b * c;
					}
				}
			}
		});

	eulerProblem(10, 'Summation of primes',
		'The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.<br>' +
		'Find the sum of all the primes below two million.<br>',

		function() {
// this  method takes ~11 minutes

//			function isPrime(n) {
//				if(n < 2) return false;
//				if(n == 2) return true;
//				return _.chain(_.range(2, Math.sqrt(n) + 1))
//				.filter(function(x){ return n % x == 0; })
//				.isEmpty()
//				.value();
//			}
//
//			return _.chain(_.range(2, 2000000))
//			.filter(isPrime)
//			.reduce(function(a, b) {
//				return a + b;
//			})
//			.value();

			var sieve = {};
			sieve[0] = true;
			sieve[1] = true;

			for(var i = 2; i < 2000000; i++) {
				if(sieve[i] === true) {
					continue;
				} else {
					for(var j = i * 2; j < 2000000; j += i) {
						sieve[j] = true;
					}
				}
			}

			return _.chain(_.range(2, 2000000))
			.filter(function(n){ return !sieve[n]; })
			.reduce(function(a, b) { return a + b; })
			.value();
		});

	/*eulerProblem(9, 'title',
		'description',

		function() {

		});*/

	wireButtons();
})