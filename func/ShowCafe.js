const {Table, SimpleResponse} = require('actions-on-google');
const request = require('sync-request')

const url = 'http://myserver.aaronroh.org:5000/cafe'
module.exports = (conv, {cafe_name}) => {
    var cafeName = conv.arguments.get('cafeteria')
    conv.ask(conv.arguments.get('cafeteria') + ' 메뉴를 알려드릴게요')

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

    for(var i = 0; i < menuSize; i++){
        menuCells.push(
            {
                cells: [],
                dividerAfter: true
            }
        )
    }

    for(var i = 0; i < menuSize; i++){
        var size = Object.keys(result['food'][i]).length
        // 해당 food 리스트 길이
        for(var j = 0; j < size; j++){
           menuCells[j].cells.push(result['food'][i][j])
        }
    }

    conv.ask(new Table({
        title: cafeName + ' 메뉴',
        columns: menuHeader,
        rows: menuCells
    }))
}