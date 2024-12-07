import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    avatar_url: "",
    name: "",
    username: "",
    location: "",
    email: "",
    company: "",
    bio: "",
    html_url: "",
  });

  const searchGithubCandidates = async () => {
    try {
      const users = await searchGithub();
      if (users.length === 0) {
        console.warn("No users found");
        return;
      }

      const randomUser = users[Math.floor(Math.random() * users.length)];
      const userData = await searchGithubUser(randomUser.login);

      setCurrentCandidate({
        avatar_url: userData.avatar_url || "No avatar provided",
        name: userData.name || "No name provided",
        username: userData.login || "No username provided",
        location: userData.location || "No location provided",
        email: userData.email || "No email provided",
        company: userData.company || "N/A",
        bio: userData.bio || "No information provided",
        html_url: userData.html_url || "",
      });
    } catch (err) {
      console.error("An error occurred while fetching candidate data:", err);
    }
  };

  const addCandidateToLocalStorage = () => {
    if (currentCandidate.username !== "N/A") {
      const storedCandidates = JSON.parse(
        localStorage.getItem("savedCandidates") || "[]"
      );

      // append new candidate object to array
      const updatedCandidates = [...storedCandidates, currentCandidate];

      // set local storage with updated candidates
      localStorage.setItem(
        "savedCandidates",
        JSON.stringify(updatedCandidates)
      );

      // print structure of candidate to debug
      console.log("Candidate saved:", currentCandidate);

      // Fetch the next candidate after adding
      searchGithubCandidates();
    } else {
      console.warn(
        "Cannot save candidate with username:",
        currentCandidate.username
      );
    }
  };

  useEffect(() => {
    searchGithubCandidates();
  }, []);

  return (
    <>
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        <img
          className="candidate-image"
          src={currentCandidate.avatar_url || ""}
          alt="Candidate Avatar"
        />
        <div className="candidate-info">
          <h2>{`${currentCandidate.name} (${currentCandidate.username})`}</h2>
          <p>Location: {currentCandidate.location}</p>
          <p>Company: {currentCandidate.company}</p>
          <p>
            Email:{" "}
            <a href={`mailto:${currentCandidate.email}`}>
              {currentCandidate.email}
            </a>
          </p>
          <p>Bio: {currentCandidate.bio}</p>
        </div>
      </div>
      <div className="action-buttons">
        <button className="delete-button" onClick={searchGithubCandidates}>
          -
        </button>
        <button className="add-button" onClick={addCandidateToLocalStorage}>
          +
        </button>
      </div>
    </>
  );
};

export default CandidateSearch;
