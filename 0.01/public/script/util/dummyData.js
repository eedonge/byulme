define(function(require){
	var $ = require('jquery');
	var DummyData = function() {
		this.cardList = new Array();
	
		this.tmpNewCardList = {
			'001':
			{
				'menuId':'newly',
				'starId':'001',
				'rank':'1',
				'starName':'로보캅',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			},
			'002':
			{
				'menuId':'newly',
				'starId':'002',
				'rank':'2',
				'starName':'슈퍼맨',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			},
			'003':
			{
				'menuId':'newly',
				'starId':'003',
				'rank':'3',
				'starName':'배트맨',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			},
			'004':
			{
				'menuId':'newly',
				'starId':'004',
				'rank':'4',
				'starName':'스파이더맨',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			},
			'005':
			{
				'menuId':'newly',
				'starId':'005',
				'rank':'5',
				'starName':'아이언맨',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			}
		};

		this.tmpDailyCardList = {
			'002':
			{
				'menuId':'daily',
				'starId':'002',
				'rank':'1',
				'starName':'슈퍼맨',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			},
			'003':
			{
				'menuId':'daily',
				'starId':'003',
				'rank':'5',
				'starName':'배트맨',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			},
			'001':
			{
				'menuId':'daily',
				'starId':'001',
				'rank':'3',
				'starName':'로보캅',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			},
			'006':
			{
				'menuId':'daily',
				'starId':'006',
				'rank':'4',
				'starName':'블랙쉐도우',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			},
			'007':
			{
				'menuId':'daily',
				'starId':'007',
				'rank':'2',
				'starName':'토르',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			}
		};

		this.tmpWeeklyCardList = {
			'005':
			{
				'menuId':'weekly',
				'starId':'005',
				'rank':'1',
				'starName':'아이언맨',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			},
			'003':
			{
				'menuId':'weekly',
				'starId':'003',
				'rank':'4',
				'starName':'배트맨',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			},
			'009':
			{
				'menuId':'weekly',
				'starId':'009',
				'rank':'3',
				'starName':'울버린',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			},
			'006':
			{
				'menuId':'weekly',
				'starId':'006',
				'rank':'2',
				'starName':'블랙쉐도우',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			},
			'007':
			{
				'menuId':'weekly',
				'starId':'007',
				'rank':'5',
				'starName':'토르',
				'defaultStore':'youtube',
				'movieUrl':'http://61.250.22.139/livedoc/sample-data/sample-media.mp4'
			}
		};
	};

	DummyData.prototype.cardData = function(id) {
		// if(this.cardList.length == 0) {
			switch(id) {
				case 'newly' :
					this.cardList = this.tmpNewCardList;
					break;
				case 'daily' :
					this.cardList = this.tmpDailyCardList;
					break;
				case 'weekly' :
					this.cardList = this.tmpWeeklyCardList;
					break;
				default :
					this.cardList = this.tmpNewCardList;
					break;
			}
		// }
		
		return this.cardList;
	};

	return new DummyData();
});