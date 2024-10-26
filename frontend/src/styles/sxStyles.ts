export const CardSx = {
  card: {
    width: 200,
    height: 200,
    margin: 2,
    padding: 1,
    boxShadow: 3,
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  cardContent: {
    display: "flex",
    width: 180,
    flexDirection: "column",
    height: "85%",
    justifyContent: "space-between",
    gap: 1,
  },
  description: {
    height: 80,
    overflowWrap: "break-word",
    overflowY: "auto",
  },
};

export const ModalSx = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "5px",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
};
