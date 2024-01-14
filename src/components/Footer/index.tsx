import { Box, Container, Link, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; 2024 - Narejiro Web Version
          </Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          Crafted by : {' '}
          {/* <Link
            href="https://bloomui.com"
            target="_blank"
            rel="noopener noreferrer"
          > */}
            TCI ECX BackSystem Young Team
          {/* </Link> */}
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
