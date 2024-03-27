import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";
import PeopleIcon from "@mui/icons-material/People";
import ClassIcon from "@mui/icons-material/Class";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import EmailIcon from "@mui/icons-material/Email";

const StatContainer = ({ title, value, icon }) => (
  <Card sx={{ borderRadius: 4, p: 3, height: "100%" }}>
    <CardContent>
      <Grid container wrap="nowrap" alignItems="center">
        <Grid item>{icon}</Grid>
        <Grid item sx={{ pl: 2 }}>
          <Typography variant="h5" color="text.primary">
            {value}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const LandingPage = () => {
  const theme = useTheme();
  const { totalStudents, totalClasses, totalReservation, totalEmailTemplate } =
    React.useContext(GlobalContext);

  const statCards = [
    {
      title: "Students",
      value: totalStudents,
      icon: <PeopleIcon />,
    },
    {
      title: "Classes",
      value: totalClasses,
      icon: <ClassIcon />,
    },
    {
      title: "Reservations",
      value: totalReservation,
      icon: <CoPresentIcon />,
    },
    {
      title: "Templates",
      value: totalEmailTemplate,
      icon: <EmailIcon />,
    },
  ];

  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Welcome to Fresher Academy Management System!
        </Typography>
        <Typography variant="body1" gutterBottom>
          We provide the best learning experience for freshers. Our platform
          offers a wide range of classes, resources, and tools to help you grow
          and succeed in your career.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Join our community of learners and start your journey today!
        </Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 2rem 1.5rem 2rem",
          [theme.breakpoints.down("sm")]: {
            padding: "3rem 1rem 1rem 1rem",
          },
        }}
      >
        <Grid container spacing={3}>
          {statCards.map((stat, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={3}>
              <StatContainer {...stat}></StatContainer>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
