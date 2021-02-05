// 0-4-2. 二点間の距離

// http://kudakurage.hatenadiary.com/entry/20100319/1268986000
// http://qiita.com/sy_sft_/items/b0a6f2143db0e1a191e8
// http://d.hatena.ne.jp/maachang/20160210/1455033754
// http://offsidenow.phpapps.jp/archives/496
cmn.get_distance = function(lat1, lng1, lat2, lng2){
  var lat1 = (+lat1),
      lng1 = (+lng1),
      lat2 = (+lat2),
      lng2 = (+lng2),
      lat_average = Math.PI / 180 * ( lat1 + ((lat2 - lat1) / 2) ),
      lat_difference = Math.PI / 180 * ( lat1 - lat2 ),
      lon_difference = Math.PI / 180 * ( lng1 - lng2 ),
      curvature_radius_tmp = 1 - 0.00669438 * Math.pow(Math.sin(lat_average), 2),
      meridian_curvature_radius = 6335439.327 / Math.sqrt(Math.pow(curvature_radius_tmp, 3)),
      prime_vertical_circle_curvature_radius = 6378137 / Math.sqrt(curvature_radius_tmp),
      distance = 0,
      distance_unit = "";
	
	//２点間の距離をメートルで取得する（単位なし）
	distance = Math.pow(meridian_curvature_radius * lat_difference, 2) + Math.pow(prime_vertical_circle_curvature_radius * Math.cos(lat_average) * lon_difference, 2);
	distance = Math.sqrt(distance);
  distance = Math.round(distance);
  
  // ２点間の距離を単位ありで取得する（1000m以上は、kmで表示）
	distance_unit = Math.round(distance);
	if (distance_unit < 1000) {
		distance_unit = distance_unit + "m";
	} else {
		distance_unit = Math.round(distance_unit / 100);
		distance_unit = (distance_unit / 10) + "km";
	}
	
	return {
    "distance": distance,
    "distance_unit": distance_unit
  };

};
