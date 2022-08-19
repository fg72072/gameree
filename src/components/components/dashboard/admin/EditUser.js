import { Form } from "react-bootstrap"
import noimage from '../../../../assets/images/no-image.png'

function EditUser(props)
{
    return <>
     <aside className="left-sidebar" style={{right:props.isopen}}>
                <header className="profile-image-section">
                    <img src={noimage}/>
                </header>
                <section className="body-section">
                    <Form>
                    <Form.Group className="form-group" controlId="username">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control value={"John Wick"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="dob">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control value={"24 - JULY - 1980"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={"john.wick@gameree.net"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="wallet_address">
                        <Form.Label>Wallet Address</Form.Label>
                        <Form.Control value={"asdklhasdklashdaskl"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="name">
                        <Form.Label>Building Name</Form.Label>
                        <Form.Control as="textarea"  value={"W1 Curates, Art Gallery, Oxford Street, London, UK"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="number">
                        <Form.Label>Building Number</Form.Label>
                        <Form.Control value={"007"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="bussiness_name">
                        <Form.Label>Business Name</Form.Label>
                        <Form.Control value={"Software House"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="post_code">
                        <Form.Label>Post Code</Form.Label>
                        <Form.Control value={"1000897"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={"London"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="avatar">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control value={"Tyson"}/>
                    </Form.Group>
                    <Form.Group className="form-group form-footer-btn-group">
                        <button type="button" className="custom-btn danger-btn" onClick={(e)=>props.setEdit(false)}>
                          Cancel
                        </button>
                        <button type="button" className="custom-btn light-primary-btn" onClick={(e)=>props.setEdit(false)}>
                          Save
                        </button>
                    </Form.Group>
                    </Form>
                </section>    
            </aside>
    </>
}
export default EditUser