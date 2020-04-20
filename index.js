addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

	var response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
	var finalResponse = null;
	const {variants} = await response.json();

	
	const variant1 = variants[0];
	const variant2 = variants[1];
	var whichVariant;

	
	const cookie = request.headers.get('cookie');
	// console.log(cookie.split('=')[1]);
	// console.log(cookie);
	// console.log("____")
	if(cookie && cookie.split('=>')[1] == variant1){//if cookie exists and holds variant 1
		finalResponse = await fetch(variant1);
		whichVariant = 0;
		console.log("cookie variant 1 used")
	}
	else if(cookie && cookie.split('=>')[1] == variant2){//if cookie exists and holds variant 2
		finalResponse = await fetch(variant2);
		whichVariant = 1;
		console.log("cookie variant 2 used")
	}

	else{//no cookies found, need to set
		var num = Math.round(Math.random())
		let variant = variants[num];
		whichVariant = num;
		// let variant = variants[1];
		finalResponse = await fetch(variant);
		finalResponse = new Response(finalResponse.body, finalResponse);
		// var tempExp = 'Wed, 31 Oct 2020 08:50:17 GMT';
		finalResponse.headers.set('Set-Cookie',`url_variant=>${variant}`); 
		
		// console.log("cookie created")
		
	}
	//get between 0 or 1.
	
	

	// console.log("bp1");
	// console.log()
	// console.log("bp2");

	return  new HTMLRewriter().on('a', new elementRewriter('href'))
  							            .on('title',new elementRewriter('title',whichVariant))
  							            .on('h1',new elementRewriter('h1',whichVariant))
										.on('p',new elementRewriter('p',whichVariant))
										.on('a', new elementRewriter('a'))
                            .transform(finalResponse)

}

class elementRewriter{
	constructor(tag,variant) {
		
		this.tag = tag
		this.variant = variant
	}

	

	text(text){

		if(this.tag == 'title' && (!text.lastInTextNode)){
			if(this.variant == 0){
				text.replace('Variant 1-sswami');
			}
			else if(this.variant == 1){
				text.replace('Variant 2-sswami');
			}
		}

		else if(this.tag == 'h1' && (!text.lastInTextNode)){
			if(this.variant == 0){
				text.replace('This is Sidhant Swami Variant 1');
			}
			else if(this.variant == 1){
				text.replace('This is Sidhant Swami Variant 2');
			}
		}
		else if(this.tag == 'a' && (!text.lastInTextNode)){
			text.replace('Sidhant Swami Github Profile');
		}
		else{// tag is 'p'
			if(!text.lastInTextNode){
				if(this.variant == 0){
					text.replace('Sidhant Swami Variant 1!');
				}
				else if(this.variant == 1){
					text.replace('Sidhant Swami Variant 2!');
				}
			}

		}

	}
	element(element){
		if(this.tag =="href"){
			if(element.getAttribute(this.tag)){
				element.setAttribute(this.tag,'https://github.com/sidhantswami');
			}
		}
		
	}
  }
