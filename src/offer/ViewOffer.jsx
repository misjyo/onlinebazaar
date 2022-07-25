import React from 'react'
import {Table, Modal,Button,Form,Col,Row} from 'react-bootstrap';
import { useState,useEffect } from 'react';

export default function ViewOffer() {
let [data,setData]=useState([]);

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);


let [offerid, setOfferid] = useState("");
let [coupancode, setCoupancode] = useState("");
let [fromdate, setFromdate] = useState("");
let [todate, setTodate] = useState("");
let [discountpercentage, setDiscountpercentage] = useState("");
let [flatdiscount, setFlatdiscount] = useState("");
let [validin, setValidin] = useState("");
let [bankoffer, setBankoffer] = useState("");



  useEffect(()=>{
    async function displayOffer(){
   
  let response = await fetch('http://localhost:3001/admin/offer-get')
  let udata = await response.json()
  setData(udata.response); 
  // console.log(udata)
      }
      displayOffer();
    },[])



    function deleteData(offerid) {
     
      fetch(`http://localhost:3001/admin/offer-delete/${offerid}`, {
        method: "DELETE",
      }).then((res) => console.log("user deleted", +res));
    }


    function updateData(offerid,coupancode,fromdate,todate,discountpercentage,flatdiscount,validin,bankoffer,)
{
    setOfferid(offerid);
    setCoupancode(coupancode);
    setFromdate(fromdate);
    setTodate(todate);
    setDiscountpercentage(discountpercentage);
    setFlatdiscount(flatdiscount);
    setValidin(validin);
    setBankoffer(bankoffer);

    setShow(true);
}

function updateOffer(){
  let userdata = {
    offerid,coupancode,fromdate,todate,discountpercentage,flatdiscount,validin,bankoffer,
}
  fetch(`http://localhost:3001/admin/offer-update/${offerid}`, {
    method: 'PATCH',
    body: JSON.stringify(userdata),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));


}

  return (
    <div className='container' style={{overflowX:'auto'}}> 
    <h1> OfferList </h1>
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>OfferId</th>
        <th>CoupanCode</th>
        <th>From Date</th>
        <th>To Date</th>
        <th>Discount Percentage</th>
        <th>Flat Discount</th>
        <th>Valid In</th>
        <th>Bank Offer</th>
        <th>Action</th>
        <th>Update</th>
      </tr>
    </thead>
    <tbody>
     {data.map((item,index)=>{
        return(
       <tr key={index}>
        <td>{item.offerid}</td>
        <td>{item.coupancode}</td>
        <td>{item.fromdate}</td>
        <td>{item.todate}</td>
        <td>{item.discountpercentage}</td>
        <td>{item.flatdiscount}</td>
        <td>{item.validin}</td>
        <td>{item.bankoffer}</td>
        <td><button className='btn btn-danger' onClick={()=>deleteData(item.offerid)}>Delete</button></td>
        <td><button className='btn btn-success'onClick={()=>{updateData(
          item.offerid,
          item.coupancode,
          item.fromdate,
          item.todate,
          item.discountpercentage,
          item.flatdiscount,
          item.validin,
          item.bankoffer
        )}}>Update</button></td>
      </tr>
        )
    })
}
    </tbody>
  </Table>
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>update shop</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
      <Row>
        <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>OfferId</Form.Label>
      <Form.Control type="text" placeholder="Enter offerId" value={offerid} onChange={(e)=>setOfferid(e.target.value)}/> 
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>CoupanCode</Form.Label>
      <Form.Control type="text" placeholder="coupan code"  value={coupancode} onChange={(e)=>setCoupancode(e.target.value)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>From Date</Form.Label>
      <Form.Control type="Date" placeholder=""  value={fromdate} onChange={(e)=>setFromdate(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>To date</Form.Label>
      <Form.Control type="Date" placeholder=""  value={todate} onChange={(e)=>setTodate(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Discount Percentage</Form.Label>
      <Form.Control type="text" placeholder=""  value={discountpercentage} onChange={(e)=>setDiscountpercentage(e.target.value)}/>
    </Form.Group>
    </Col>
        <Col><Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Flat Discount</Form.Label>
      <Form.Control type="text" placeholder="flat discount"  value={flatdiscount} onChange={(e)=>setFlatdiscount(e.target.value)}/>
    </Form.Group>
    
   
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Bank Offer</Form.Label>
      <Form.Control type="text" placeholder="bank offer"  value={bankoffer} onChange={(e)=>setBankoffer(e.target.value)}/>
    </Form.Group>
   
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Valid In </Form.Label>
        <select className="form-select"  value={validin} onChange={(e)=>setValidin(e.target.value)}> 
      <option> All Over India </option>
      <option> Specific City </option>
      </select>
    

    </Form.Group>
    
   </Col>
      </Row>
   
    
  </Form>
  </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={()=>{ updateOffer();handleClose()}}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>



  </div>
  )
}