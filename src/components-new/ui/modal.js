import Container from "../blog/container";

export default function Modal({ children }) {
  return (
    <div className="modal w-screen h-screen fixed top-0 left-0 bg-green-black bg-opacity-80">
      <Container>
        <div className="flex justify-center items-center bg-white">
          {children}
        </div>
      </Container>
    </div>
  );
}
