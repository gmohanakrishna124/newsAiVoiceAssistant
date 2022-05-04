import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import BannerImg from './images/banner.jpg'
import logo from './images/logo.png';
import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: '15e5bb58c1a640374182bf068eba4e192e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'.5rem 1.2rem',backgroundColor:'skyblue',height:'8vh',boxShadow:'0px 2px rgba(0,0,0,0.06)'}}>
        <h6 style={{paddingLeft:'.8rem',fontSize:'1.3rem',fontWeight:'bold',color:'black',fontStyle:'italic'}}>Latest News</h6>
        <div style={{display:'flex',marginRight:'.5rem'}}>
          <p style={{fontSize:'.97rem',fontWeight:'bold',color:'black',fontStyle:'italic',padding:'.4rem .3rem',marginRight:'.6rem'}}>Language</p>
          <p style={{fontSize:'.97rem',fontWeight:'bold',color:'black',fontStyle:'italic',padding:'.4rem .6rem',marginRight:'.6rem'}}>City</p>
          <p style={{fontSize:'.97rem',fontWeight:'bold',color:'black',fontStyle:'italic',padding:'.4rem .3rem',marginRight:'.6rem'}}>Sign Up</p>
        </div>
      </header>
      <div style={{width:'100%',height:'100vh',position:'relative'}}>
        <img src={BannerImg} style={{position:'relative',width:'100%',height:'100%',objectFit:'cover'}} alt='banner' />
        <div style={{position:'absolute',top:'0',left:'0',zIndex:'3',display:'flex',height:'100vh',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',paddingLeft:'2rem'}} className='hiii'>
          <div >
            <h5 style={{fontSize:'2.4rem',fontWeight:'bold',color:'white',padding:'0',margin:'0'}}>Using AI Voice Assistant</h5>
            <p style={{fontSize:'1.4rem',fontWeight:'normal',color:'white',padding:'0',margin:'0',marginBottom:'.4rem'}}>Get Trending Latest News from anywhere</p>
            <p style={{fontSize:'1.8rem',fontWeight:'bold',color:'white',padding:'.3rem 0',margin:'0'}}>Just ask</p>

            <p style={{fontSize:'1.45rem',fontWeight:'normal',color:'yellow',fontStyle:'italic',padding:'.1rem 0',margin:'0'}}>Give me the news from BBC News</p>
            <p style={{fontSize:'1.45rem',fontWeight:'normal',color:'yellow',fontStyle:'italic',padding:'.1rem 0',margin:'0'}}>What's up with Bitcoin</p>
          </div>
        </div>
      </div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
      </div>
      <div >
        <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      </div>
      
    </div>
  );
};

export default App;

