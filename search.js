---
---
var docs = 
{
{% for post in site.posts limit:10 %}
	{% include post.json %},
{% endfor %}
};
// init lunr
var idx = lunr(function () {
	this.field('title', {boost: 10});
	this.field('content');
	this.ref('id');
})
// add each document to be index
for(var index in docs) {
	var tmp = {
		id: docs[index].id,
		title: locdau(docs[index].title),
		content: locdau(docs[index].content)
	};
	idx.add(tmp);
}

function locdau(str_in){
	var str = str_in;
	str= str.toLowerCase();
	str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
	str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
	str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
	str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
	str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
	str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
	str= str.replace(/đ/g,"d");
	str= str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g,"-");
	str= str.replace(/-+-/g,"-");
	str= str.replace(/^\-+|\-+$/g,"");
	str= str.replace("/-/g", " ");
	return str;
}
