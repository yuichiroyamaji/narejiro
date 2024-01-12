import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import RecentKnowledges from './RecentKnowledges';

function DashboardKnowledges() {
  return (
    <>
      <Helmet>
        <title>Knowledges Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentKnowledges />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardKnowledges;
