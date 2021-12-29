import React,{useState, useEffect} from 'react'
import axios from 'axios'

function Parking() {

    const [count, setCount] = useState(0)
    const [slots, setslots] = useState({})
    const [list, setLists] = useState([])

    useEffect(()=>{

        let list = []
        for(let i=1;i<101;i++){
            let newlist = list
            newlist.push(`D${i}`)
            setLists(newlist)
        }

        axios.get('http://127.0.0.1:5000/slots')
            .then(function (response) {
                {setslots({...response.data})}
            })
            .catch(function (error) {
                console.log(error);
            })
    },[count]);

    function slotWork(reserved, slotname){
        if(reserved){
            if(window.confirm("So you want to UnAllocate this slot ?")){
                axios.delete(`http://127.0.0.1:5000/slot/${slotname}`)
                .then(function (response) {
                    setslots({...slots, slotname :{
                        owner:'None',
                        carnumber:'None',
                        reserved:false
                    }})
                    setCount(count+1)
                })
                .catch(function (error) {
                console.log(error);
                })
            }
            
        }else{
            if(window.confirm("So you want to Allocate this slot ?")){
            let name,carnumber;
            while(!name && !carnumber ){
                name=prompt('Enter Your Name : ');
                carnumber=prompt('Enter Your CarNumber : ');
            };
            axios.get(`http://127.0.0.1:5000/reserve/${slotname}/${carnumber}/${name}`)
              .then(function (response) {
                    setslots({...slots, slotname :{
                        owner:name,
                        carnumber:carnumber,
                        reserved:true
                    }})
                    setCount(count+1)
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }};

    return (
        <div>

            <div className='parkingslots'>
            {  
             (slots!=={} && list.length===100)?
              list.map(slot => {
                  if(slots[slot]!==undefined)  
                    return <div key={slot} className={`slot ${slot}`} onClick={()=>{slotWork(slots[slot].reserved, slot)}}>
                        <p>{slot}</p>
                        <p>{slots[slot].owner}</p>
                        <p>{slots[slot].carnumber}</p>
                        </div>
              } 
              )
             :''
            }
            </div>
            
        </div>
    )
};

export default Parking
