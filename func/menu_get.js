const {Table, SimpleResponse} = require('actions-on-google');
const request = require('sync-request')

module.exports = (conv, cafe_name='gyosoo', day='today') => {
    try{
        var url = 'http://myserver.aaronroh.org:5000/cafe'
        url += '/' + cafe_name + '/' + day
    
        var response = request('GET', url)
        var result = response.getBody()
        result = JSON.parse(result)
        console.log(result)
        
        const menuSize = Object.keys(result['title']).length
        
        var menuHeader = []
        // Table object 제목부분
        var menuCells = []
        // Table object 내용부분
        
        for(var i = 0; i < menuSize; i++){
            menuHeader.push(
                {   header: result['title'][i],
                    align: 'CENTER'
                })
        }
        /*
        헤더부분 먼저 처리하고.
        cells 리스트의 데이터는 어시스턴트에서 - 방향으로 보여진다.
        한 메뉴에 대한 음식은 ㅣ 로 처리되야하므로
        먼저 Cells를 구성한 후, 인덱스 통해 해결한다
        */
    
        for(var i = 0; i < menuSize+3; i++){
            menuCells.push(
                {
                    cells: [],
                    dividerAfter: true
                }
            )
        }
        console.log(menuCells)

        var cells_level = 0

        for(var i = 0; i < menuSize; i++){
            var size = Object.keys(result['food'][i]).length
            // 해당 food 리스트 길이
            console.log("food size : ", size)
            for(var j = 0; j < size; j++){
                console.log('\n\n\n'+j)
                console.log(result['food'][i][j])
                console.log(menuCells)
               menuCells[j].cells.push(result['food'][i][j])
            }

        }
        cafe_name = '후생관'
        conv.ask(cafe_name + ' 메뉴를 알려드리겠습니다')
        conv.ask(new Table({
            title: cafe_name + ' 메뉴',
            columns: menuHeader,
            rows: menuCells
        }))
    }
    catch(e) {
        console.log(e)
        console.log('cafeName : ',cafeName)
        console.log('cafe_name : ',cafe_name)
        conv.ask('오류가 났습니다 - error 8321\n개발자에게 알려주세요')
        conv.ask(e)
    }
}