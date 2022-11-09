import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
  const estilosHome = { 
    // backgroundColor: "red" 
  };

  // console.log(config.playlists);
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  return (
    <>
    <CSSReset/>
    <div style={estilosHome}>
      <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}></Menu>
      <Header></Header>
      <TimeLine searchValue={valorDoFiltro} playlists={config.playlists}></TimeLine>
    </div>
    </>
  );
}

export default HomePage;

// function Menu() {
//   return <div>Menu</div>;
// }

const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    /* margin-top: 50px; */
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;
const StyledBanner = styled.div`
    background-image: url(${config.banner});
    height: 230px;
`;
function Header() {
  return (
    <StyledHeader>
      <StyledBanner/>
      {/* <img src="banner"/> */}
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.nome}</h2>
          <p>{config.cargo}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function TimeLine({searchValue, ...props}) {
  // console.log("Dentro do componente", props.playlists);
  const playlistNames = Object.keys(props.playlists);
// Retorno por expressao
  return (
    <StyledTimeline>
        {playlistNames.map((playlistNames) => {
          const videos = props.playlists[playlistNames];
          return (
            <section>
              <h2>{playlistNames}</h2>
              <div>
                {videos.filter((video)=> {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized)
                }).map((video) => {
              return (
                <a href={video.url}>
                  <img src={video.thumb}/>
                  <span>
                    {video.title}
                  </span>
                </a>
                  )
                })}
              </div>
            </section>
          )
        })}
    </StyledTimeline>
  )
}
