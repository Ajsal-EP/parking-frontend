import React,{useState, useEffect} from 'react'
import axios from 'axios'

function Parking() {
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
                setslots({...response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    },[]);

    function slotWork(reserved, slotname){
        if(reserved){
            if(window.confirm("So you want to UnAllocate this slot ?")){
                axios.delete(`http://127.0.0.1:5000/slot/${slotname}`)
                .then(function (response) {
                if(response.status === 200){
                    console.log('Success')
                }
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
            axios.post('http://127.0.0.1:5000/reserve', {
                slotname: slotname,
                carnuumber: carnumber,
                owner:name,
              })
              .then(function (response) {
                if(response.status === 200){
                    console.log('Success')
                }
              })
              .catch(function (error) {
                console.log(error);
              });
            }
        }
    };

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
}

export default Parking
