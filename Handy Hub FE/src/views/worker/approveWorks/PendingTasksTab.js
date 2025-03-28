import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Media,
  Progress,
  Badge,
} from "reactstrap";

const BASE_URL = "http://localhost:8080/worker/task";
const TOKEN = "Bearer <your_token>"; // Replace with actual token

const PendingTasksTab = ({ works }) => {
  const [workData, setWorkData] = useState([]);

  useEffect(() => {
    setWorkData(works.filter((w) => w.status === "PENDING"));
  }, [works]);

  // API Call Function
  const updateTaskStatus = async (taskId, status, index) => {
    try {
      const response = await fetch(`${BASE_URL}/${taskId}`, {
        method: "PATCH", // Using PATCH for status updates
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"), // Ensure correct key
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json(); // Parse JSON response

      if (!response.ok) throw new Error(data.msg || "Failed to update task");

      alert("✅ Task Status Change!"); // Show success message

      // Refresh the page on successful update
      window.location.reload();

      // OR, update the UI without refreshing
      // setWorkData((prevWorks) => prevWorks.filter((_, i) => i !== index));

    } catch (error) {
      console.error(`Error updating task ${taskId}:`, error);
      alert("❌ Error updating task. Please try again.");
    }
  };


  if (workData.length === 0) {
    return (
      <Card className="shadow-lg border-0 rounded">
        <CardBody>
          <CardTitle tag="h3" className="mb-4 text-primary">
            <i className="fas fa-clock me-2"></i>Pending Tasks
          </CardTitle>
          <p className="text-center text-muted py-4">No pending tasks found</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 rounded">
      <CardBody>
        <CardTitle tag="h3" className="mb-4 text-primary">
          <i className="fas fa-clock me-2"></i>Pending Tasks
        </CardTitle>

        <ListGroup flush>
          {workData.map((work, index) => (
            <ListGroupItem key={work.id} className="p-4">
              <Row>
                <Col md={8}>
                  <Media>
                    <div className="me-3">
                      <i className="fas fa-toolbox fa-2x text-warning"></i>
                    </div>
                    <div>
                      <h5 className="mt-0">{work.description}</h5>
                      <CardText className="text-muted mb-1">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        {work.address || "No Address Provided"}
                      </CardText>
                      <CardText className="mb-1">
                        <i className="fas fa-calendar-alt me-2"></i>
                        Due:{" "}
                        {work.dueDate
                          ? new Date(work.dueDate).toLocaleDateString()
                          : "Not Specified"}
                      </CardText>
                      <div className="mt-2">
                        <Badge color="information">Special Details  : {work.title}</Badge>
                      </div>
                      <div className="mt-2">
                        <Badge color="warning">PENDING</Badge>
                      </div>
                    </div>
                  </Media>
                </Col>

                <Col md={4} className="text-md-right mt-3 mt-md-0">
                <h4 className="text-primary mb-2">${work.price || "N/A"}</h4>
                  {/*<div className="mb-3">*/}
                  {/*  <Progress*/}
                  {/*    value={work.completion || 0}*/}
                  {/*    color="info"*/}
                  {/*    className="mb-2"*/}
                  {/*  />*/}
                  {/*  <small className="text-muted">*/}
                  {/*    {work.completion || 0}% Complete*/}
                  {/*  </small>*/}
                  {/*</div>*/}

                  <div className="d-flex justify-content-end">
                    <Button
                      color="success"
                      className="me-2"
                      onClick={() => updateTaskStatus(work.id, "APPROVED", index)}
                    >
                      <i className="fas fa-check"></i> Approve
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => updateTaskStatus(work.id, "REJECTED", index)}
                    >
                      <i className="fas fa-times"></i> Reject
                    </Button>
                  </div>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default PendingTasksTab;
