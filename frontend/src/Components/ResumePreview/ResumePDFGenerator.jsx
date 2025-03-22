import { useCallback } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const ResumePDFGenerator = () => {
  const generatePDF = useCallback(
    (elementSelector, fileName = "Resume_Generated") => {
      const element = document.querySelector(elementSelector);
      if (!element) {
        console.error("Element not found:", elementSelector);
        return;
      }

      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`${fileName}.pdf`);
      });
    },
    []
  );

  return { generatePDF };
};

export default ResumePDFGenerator;
