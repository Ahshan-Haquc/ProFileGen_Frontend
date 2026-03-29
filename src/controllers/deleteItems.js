import toastShow from "../utils/toastShow";

// deleteItems.js
export default async function deleteProject(cvId, pageName, indexToDelete, setUserCV) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/deleteItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cvId,
        pageName,
        indexToDelete
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toastShow(data.message,"success");
      setUserCV(data.updatedCV); // Update CV
    } else {
      toastShow(data.message,"error");
    }
  } catch (error) {
    console.log("Error in deletion:", error);
    toastShow("Not deleted, catch error","error");
  }
}
