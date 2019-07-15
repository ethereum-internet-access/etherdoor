import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built by the '}
      <Link color="inherit" href="https://github.com/ethereum-internet-access">
	IntacTok
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'ETH-1',
    subheader: '1 hour pass',
    price: '0.002',
    description: ['512 MB/s', 'Stake guarantee'],
    buttonText: 'Get pass',
    buttonVariant: 'contained',
  },
  {
    title: 'ETH-2',
    subheader: '2 hour pass',
    price: '0.004',
    description: ['512 MB/s', 'Stake guarantee'],
    buttonText: 'Get pass',
    buttonVariant: 'contained',
  },
  {
    title: 'IntacTok-1',
    subheader: '1 hour pass',
    price: '1',
    description: ['512 MB/s', 'Stake guarantee'],
    buttonText: 'Get pass',
    buttonVariant: 'contained',
  },
  {
    title: 'IntacTok-2',
    subheader: '2 hour pass',
    price: '2',
    description: ['512 MB/s', 'Stake guarantee'],
    buttonText: 'Get pass',
    buttonVariant: 'contained',
  },
  {
    title: 'IntacTok-24',
    subheader: '24 hours pass',
    price: '10',
    description: ['512 MB/s', 'Stake guarantee'],
    buttonText: 'Get pass',
    buttonVariant: 'contained',
  },
  {
    title: 'Free',
    subheader: '5 minutes pass',
    price: '0',
    description: ['512 MB/s', 'No guarantee'],
    buttonText: 'Get pass',
    buttonVariant: 'contained',
  },
];
const footers = [
  {
    title: 'IntacTok Balance',
    description: ['Click to find out'],
  },
  {
    title: 'Buy IntacToks. 0.001 ETH x IntacTok',
    description: ['Get IntacToks'],
  },
  {
    title: 'Legal',
    description: ['We don\'t care at all'],
  },
];

export default function Pricing(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
	<Toolbar className={classes.toolbar}>
	  <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
	    Internet Access Token
	  </Typography>
	  <nav>
	  </nav>
	</Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
	<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
	  Access shared WiFi paying with Internet Access Tokens or Ethereum
	</Typography>
	<Typography variant="h5" align="center" color="textSecondary" component="p">
	  Choose your conditions, keep decentralized
	</Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
	<Grid container spacing={5} alignItems="flex-end">
	  {tiers.map(tier => (
	    // Enterprise card is full width at sm breakpoint
	    <Grid item key={tier.title} xs={12} sm={6} md={4}>
	      <Card>
		<CardHeader
		  title={tier.title}
		  subheader={tier.subheader}
		  titleTypographyProps={{ align: 'center' }}
		  subheaderTypographyProps={{ align: 'center' }}
		  action={null}
		  className={classes.cardHeader}
		/>
		<CardContent>
		  <div className={classes.cardPricing}>
		    <Typography component="h2" variant="h3" color="textPrimary">
		      {tier.price}
		    </Typography>
		    <Typography variant="h6" color="textSecondary">
		    { tier.title.match(/IntacTok-\d+/) ? 'IntacTok' : 'ETH' }
		    { tier.price > 1 ? 's' : '' }
		    </Typography>
		  </div>
		  <ul>
		    {tier.description.map(line => (
		      <Typography component="li" variant="subtitle1" align="center" key={line}>
			{line}
		      </Typography>
		    ))}
		  </ul>
		</CardContent>
		<CardActions>
	      <Button fullWidth variant={tier.buttonVariant} color="primary"
	    onClick={tier.title === 'Free' ? props.freePass : undefined }
	      >
		    {tier.buttonText}
		  </Button>
		</CardActions>
	      </Card>
	    </Grid>
	  ))}
	</Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
	<Grid container spacing={4} justify="space-evenly">
	  {footers.map(footer => (
	    <Grid item xs={6} sm={3} key={footer.title}>
	      <Typography variant="h6" color="textPrimary" gutterBottom>
		{footer.title}
	      </Typography>
	      <ul>
		{footer.description.map(item => (
		  <li key={item}>
		    <Link href="#" variant="subtitle1" color="textSecondary">
		      {item}
		    </Link>
		  </li>
		))}
	      </ul>
	    </Grid>
	  ))}
	</Grid>
	<Box mt={5}>
	  <MadeWithLove />
	</Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
