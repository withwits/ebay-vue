/*
문제)
아래의 API는 100개의 게시글에 대한 정보를 배열로 받을 수 있는 API입니다.
https://jsonplaceholder.typicode.com/posts

HTTP 통신 라이브러리로 위 API를 호출한 뒤 특정 userId에 해당하는 변수를 다음과 같이 만듭니다.
ex) userId가 1이면 변수 이름은 user1

게시글 정보 중 해당 userId에 해당하는 게시글의 title 정보만 모아 아래와 같이 객체 형태로 저장합니다.
ex) user1 = {
  title1: '',
  title2: '',
  ...
  title10: ''
};
*/

/*
ex) API 예시
[
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
  }
  ...
]
*/

/*
ex) 답안 예시
userId가 1인 게시글의 제목을 객체에 모두 저장
var user1 = {
  title1: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  title2: "qui est esse",
  ...
}

var user2 = {
  title1: ...,
  title2: ...
}
*/

// TODO: 아래에 답안을 작성해주세요.



var requestHttp = function(method, url) {
	return new Promise(function(resolve, reject){
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onload = () => resolve(xhr.responseText);
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send();
	});
};

requestHttp("GET", "https://jsonplaceholder.typicode.com/posts")
.then(function(responseText){
	//console.log(responseText);
	
	var datas = JSON.parse(responseText);	
	//console.log(datas);

	var reducer = function(accumulator, value){		
		var user = 'user' + value.userId;
		
		var title = new String('title');
		if(accumulator.hasOwnProperty(user)){
			title = title.concat((Object.keys(accumulator[user]).length + 1));
			
			accumulator[user][title] = value.title;
		}else {
			title = title.concat('1');
			
			accumulator[user] = {};
			accumulator[user][title] = value.title;
		}
		
		return accumulator;
	}
	var initialValue = {};
	var result = datas.reduce(reducer, initialValue);
	console.log(result);
})
.catch(function(statusText){
	console.log(statusText);
});







