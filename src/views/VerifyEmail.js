// ** React Imports
import { Link } from 'react-router-dom'
import { useSkin } from '@hooks/useSkin'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Button } from 'reactstrap'

// ** Styles
import '@styles/base/pages/authentication.scss'

const VerifyEmail = () => {
  // ** Hooks
  const { skin } = useSkin()

  const illustration = skin === 'dark' ? 'verify-email-illustration-dark.svg' : 'verify-email-illustration.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          
          <h2 className='brand-text text-primary ms-1'>Transportation Permits Identifiication System</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bolder mb-1'>
              Verify your email 
            </CardTitle>
            <CardText className='mb-2'>
              We ve sent a link to your email address: <span className='fw-bolder'>hello@slpermits.com</span> Please
              follow the link inside to continue
            </CardText>
            <Button block tag={Link} to='/' color='primary'>
              Skip for now
            </Button>
            <p className='text-center mt-2'>
              <span>Didn t receive an email? </span>
              <a href='/' onClick={e => e.preventDefault()}>
                <span>Resend</span>
              </a>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default VerifyEmail
