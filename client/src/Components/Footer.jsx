import React from 'react';
import { Container, Typography, IconButton, TextField, Grid, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, Home, Info, MailOutline } from '@mui/icons-material';
import styled from '@emotion/styled';

const FooterWrapper = styled(Box)({
  backgroundColor: '#030c1a'
});

const FooterContainer = styled(Container)({
  maxWidth: 'lg'
});

const FooterSection = styled.footer({
  backgroundColor: '#030c1a',
  color: '#fff',
  padding: '50px 0',
});

const CtaItem = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
});

const CtaIcon = styled.div({
  marginRight: '10px',
  fontSize: '30px',
  color: '#ff5e14',
});

const FooterText = styled(Typography)({
  marginBottom: '14px',
  fontSize: '14px',
  color: '#7e7e7e',
  lineHeight: '28px',
});

const SubscribeForm = styled.div({
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#dfe2e8',
});

const SubscribeInput = styled(TextField)({
  width: '100%',
  border: '1px solid #2E2E2E',
  color: '#dfe2e8',
});

const SubscribeButton = styled(IconButton)({
  position: 'absolute',
  right: 0,
  background: '#dfe2e8',
  border: '1px solid ##dfe2e8',
  top: 0,
  color: '#fff',
  '&:hover': {
    background: '#dfe2e8',
    color: '#fff',
  },
});

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterSection>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <div className="footerWidget">
                <div className="footerHeading">Find Us</div>
                <CtaItem>
                  <Home className="ctaIcon" />
                  <div>
                    <Typography variant="h6">1010 Avenue, sw 54321, chandigarh</Typography>
                  </div>
                </CtaItem>
                <CtaItem>
                  <MailOutline className="ctaIcon" />
                  <div>
                    <Typography variant="h6">mail@info.com</Typography>
                  </div>
                </CtaItem>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="footerWidget">
               
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="footerWidget">
                <div className="footerHeading">Subscribe</div>
                <FooterText variant="body1">
                  Don’t miss to subscribe to our new feeds, kindly fill the form below.
                </FooterText>
                <SubscribeForm>
                  <SubscribeInput
                    type="email"
                    placeholder="Email Address"
                    variant="outlined"
                  />
                  <SubscribeButton>
                    <i className="fab fa-telegram-plane"></i>
                  </SubscribeButton>
                </SubscribeForm>
              </div>
            </Grid>
          </Grid>
        </FooterSection>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;




