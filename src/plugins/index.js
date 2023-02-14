import {Swipe, SwipeItem, Icon,Popup} from 'vant';

let plugins=[
    Icon,Swipe,SwipeItem,Popup
]

export default function getVant(app){
    plugins.forEach((item) =>{
    return app.use(item)})

}