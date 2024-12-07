import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const fetchCandidatesFromStorage = () => {
    const storedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );

    setSavedCandidates(storedCandidates);
  };

  useEffect(() => {
    fetchCandidatesFromStorage();
  }, []);

  const deleteCandidateFromStorage = (username: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.username !== username
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <>
      <h1>Saved Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate, index) => (
            <tr key={index}>
              <td>
                <img
                  src={candidate.avatar_url || ""}
                  alt={`${candidate.name} avatar`}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>{candidate.name}</td>
              <td>{candidate.username}</td>
              <td>{candidate.location || "N/A"}</td>
              <td>
                <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
              </td>
              <td>{candidate.company || "N/A"}</td>
              <td>{candidate.bio || "N/A"}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => deleteCandidateFromStorage(candidate.username)}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
