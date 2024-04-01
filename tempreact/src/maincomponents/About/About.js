// About.js
import React, { useEffect,useState } from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import Loader from "../../LOADER/Loader.js"
const SidebarContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: #1f1f1f;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const NavigationList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const NavigationItem = styled.li`
  margin-bottom: 15px;
`;

const NavigationLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #383838;
  }

  &.active {
    background-color: #383838;
  }

  svg {
    margin-right: 10px;
  }
`;

const UserContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data) that takes some time
    const fetchData = () => {
      // setTimeout(() => {
        setLoading(false); // Set loading to false when the data is loaded
      // }, 2000); // Simulating a 2-second delay
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader/>;
  }
  return ( <>
    <SidebarContainer>
      <Logo src="/logo.png" alt="Logo" />
      <NavigationList>
        <NavigationItem>
          <NavigationLink to="/dashboard" activeClassName="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Add your SVG or icon component here */}
            </svg>
            Dashboard
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to="/movies" activeClassName="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Add your SVG or icon component here */}
            </svg>
            Movies
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to="/create-movie" activeClassName="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Add your SVG or icon component here */}
            </svg>
           <Link to='createmovie' style={{textDecoration:'none',color:'white'}}> Create Movie</Link>
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to="/delete-movie" activeClassName="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Add your SVG or icon component here */}
            </svg>
          <Link to={`deletemovie`} style={{textDecoration:'none',color:'white'}}>  Delete Movie</Link>
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to="/change-user-role" activeClassName="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Add your SVG or icon component here */}
            </svg>
            <Link to='getalluser' style={{textDecoration:'none',color:'white'}}>Get Users</Link>
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to="/delete-user" activeClassName="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Add your SVG or icon component here */}
            </svg>
            <Link to={`updaterole`} style={{textDecoration:'none',color:'white'}}>update role</Link>
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to="/saved-movies-by-users" activeClassName="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Add your SVG or icon component here */}
            </svg>
            Saved Movies by Users
          </NavigationLink>
        </NavigationItem>
      </NavigationList>
      <UserContainer>
        <UserAvatar src="/user-avatar.png" alt="User Avatar" />
        <p>Yash choudhary</p>
      </UserContainer>
    </SidebarContainer>
    <Outlet/>
   </>
  );
};

export default About;
