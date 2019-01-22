const {Suggestions} = require('actions-on-google');

// Variable for prevent duplicate code.
exports.CAMPUS = new Suggestions('서울캠퍼스', '글로벌캠퍼스')
exports.GLOBAL_CAFE = new Suggestions('후생관', '어문관', '기숙사식당', '후생관 교직원','국제사회교육원', '캠퍼스 변경')
exports.SEOUL_CAFE = new Suggestions('인문관','교수회관','스카이 라운지', '캠퍼스 변경')
exports.ALLCAFE = ['후생관', '어문관', '기숙사식당', '후생관 교직원','국제사회교육원','인문관','교수회관','스카이 라운지']