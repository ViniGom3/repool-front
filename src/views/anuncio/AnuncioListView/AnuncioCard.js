import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Rating } from '@material-ui/lab';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AnuncioContext from 'src/contexts/AnuncioContext';
import comodidadesContent from '../comodidades';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardContentRoot: {
    padding: 5,
    paddingBottom: 16,
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  image: {
    height: 150,
    width: '100%',
  },
  comodidadeIcon: {
    height: 25,
    width: 25,
    color: '#fff',
  },
}));

const AnuncioCard = ({ openConfirmDialog, className, anuncio, ...rest }) => {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(anuncio.isFavorite);
  const { setActive } = useContext(AnuncioContext);
  const [value, setValue] = useState(2);
  const { comodidades } = anuncio;

  const handleFavoritePress = () => {
    if (isFavorite) {
      openConfirmDialog(true);
    } else {
      setIsFavorite(true);
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Link
        onClick={() => {
          setActive(anuncio);
        }}
        to={{ pathname: anuncio.id }}
      >
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <Box position='relative' mb={3}>
            <Avatar
              alt='Anuncio'
              src={anuncio.image}
              className={classes.image}
              variant='square'
            />
            <Box display='flex' position='absolute' right={0} bottom={0}>
              {comodidades &&
                comodidades.map((comodidade) => (
                  <Avatar
                    variant='square'
                    style={{
                      backgroundColor:
                        comodidadesContent[comodidade.nome].lightColor,
                    }}
                    className={classes.comodidadeIcon}
                  >
                    <Icon
                      style={{
                        fontSize: 15,
                      }}
                    >
                      {comodidadesContent[comodidade.nome].icon}{' '}
                    </Icon>
                  </Avatar>
                ))}{' '}
            </Box>
          </Box>

          <Typography
            align='center'
            color='textPrimary'
            gutterBottom
            variant='h4'
          >
            {anuncio.title}
          </Typography>
          <Typography align='center' color='textPrimary' variant='body1'>
            {`${anuncio.city}, ${anuncio.state}`}
          </Typography>
        </CardContent>
      </Link>

      <Box flexGrow={1} />
      <Divider />
      <Box p={0.5}>
        <Grid container justify='space-between' spacing={2}>
          <Grid className={classes.statsItem} item>
            <Box component='fieldset' borderColor='transparent'>
              <Rating name='read-only' value={value} precision={0.2} readOnly />
            </Box>
          </Grid>
          <IconButton onClick={handleFavoritePress}>
            {isFavorite ? (
              <FavoriteIcon color='action' />
            ) : (
              <FavoriteBorderIcon color='action' />
            )}
          </IconButton>
        </Grid>
      </Box>
    </Card>
  );
};

AnuncioCard.propTypes = {
  openConfirmDialog: PropTypes.func,
  className: PropTypes.string,
  anuncio: PropTypes.object.isRequired,
};

export default AnuncioCard;
