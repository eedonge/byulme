define(function(require){
	// var $ = require('jquery');
	// var mysql = require('express');

	var DummyData = function() {
		var cardList = null;

		function setRandomCardlist(menuId) {
			var tmpCardList = [
				{'001' : '로보캅'},
				{'002' : '슈퍼맨'},
				{'003' : '배트맨'},
				{'004' : '스파이더맨'},
				{'005' : '아이언맨'},
				{'006' : '블랙쉐도우'},
				{'007' : '토르'},
				{'008' : '이동은'},
				{'009' : '박성현'},
				{'010' : '김성은'},
				{'011' : '김태희'},
				{'012' : '전지현'},
				{'013' : '문채원'},
				{'014' : '손예진'},
				{'015' : '한가인'},
				{'016' : '한효주'},
				{'017' : '이보영'},
				{'018' : '한지민'},
				{'019' : '한예슬'},
				{'020' : '한채영'},
				{'021' : '이효리'},
				{'022' : '배수지'},
				{'023' : '홍길동'},
				{'024' : '임꺽정'},
				{'025' : '장길산'},
				{'026' : '백두산'},
				{'027' : '설까치'},
				{'028' : '이현세'},
				{'029' : '허영만'},
				{'030' : '유상무'},
				{'031' : '장동민'},
				{'032' : '유세윤'},
				{'033' : '김철수'},
				{'034' : '이영희'},
				{'035' : '이슬이'},
				{'036' : '김희선'},
				{'037' : '심은하'},
				{'038' : '이영애'},
				{'039' : '진호영'},
				{'040' : '김제일'},
				{'041' : '나종학'},
				{'042' : '박용수'},
				{'043' : '송창의'},
				{'044' : '김주석'},
				{'045' : '김정훈'},
				{'046' : '오희록'},
				{'047' : '진영호'},
				{'048' : '이성문'},
				{'049' : '장동건'},
				{'050' : '정우성'},
				{'051' : '노무현'},
				{'052' : '김대중'},
				{'053' : '김영삼'},
				{'054' : '전두환'},
				{'055' : '노태우'},
				{'056' : '윤봉길'},
				{'057' : '김구'},
				{'058' : '안창호'},
				{'059' : '설동남'},
				{'060' : '유재석'}
			];
			var obj = {};
			var arr = [];
			var randomNumber
			var starId = '';
			var starNm = '';

			while (arr.length < tmpCardList.length) {
				randomNumber = Math.floor(Math.random() * 100 % tmpCardList.length);
				if (arr.indexOf(randomNumber) == -1){
					arr.push(randomNumber);
				}
			};

			for(i = 0; i < tmpCardList.length; i++) {
 				for(prop in tmpCardList[arr[i]]) {
					starId = prop;
					starNm = tmpCardList[arr[i]][prop];
				} 

				obj[starId] = {
					'menuId':menuId,
					'starId':starId,
					'rank':i+1,
					'starName':starNm
				}
			}

			return obj;
		}

		this.tmpNewCardList = setRandomCardlist('newly');
		this.tmpDailyCardList = setRandomCardlist('daily');
		this.tmpWeeklyCardList = setRandomCardlist('weekly');

	};

	DummyData.prototype.cardData = function(id, limit) {
		switch(id) {
			case 'newly' :
				cardList = this.tmpNewCardList;
				break;
			case 'daily' :
				cardList = this.tmpDailyCardList;
				break;
			case 'weekly' :
				cardList = this.tmpWeeklyCardList;
				break;
			default :
				cardList = this.tmpNewCardList;
				break;
		}

		return this.getCardData(cardList, limit);
	};

	DummyData.prototype.getCardData = function(list, limit) {
		var tmpList = {}
		for(sId in list) {			if (list[sId].rank > limit && list[sId].rank <= limit + 20) {
				tmpList[sId] = list[sId];
			}
		}
		return tmpList;
	}
	return new DummyData();
});