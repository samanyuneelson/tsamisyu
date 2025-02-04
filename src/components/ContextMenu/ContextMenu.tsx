import { useEffect, useRef, useState } from "react";
import { KarmaList } from "../../pages/Timebox";

interface ContextValue {
  visible: boolean;
  posX: any;
  posY: any;
  id?: string;
}

// name not finalized
interface ModalSpecs {
  isModal: boolean;
}

interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  actionFunction: (e: any) => void;
  actionId: string;
}

interface ContextFunction {
  // TO DO: this defenition needs to be made generic
  modalSpecs: ModalSpecs;
  fn: (e: any) => void;
}

interface ContextMenuProps {
  // TO DO: there needs to be a generic type here
  item: KarmaList;
  contextFunctionList: ContextFunction[];
}

export default function ContextMenu({
  item,
  contextFunctionList,
}: ContextMenuProps) {
  const [contextData, setContextData] = useState<ContextValue>({
    visible: false,
    posX: 0,
    posY: 0,
  });
  const [showModal, setShowModal] = useState(false);

  const contextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (contextRef.current && !contextRef.current.contains(event.target)) {
        setContextData((contextData) => ({
          ...contextData,
          visible: false,
        }));
      }
    }

    const handleRightClick = (e: any) => {
      e.preventDefault();
      console.debug(e.target.id);
      setContextData((oldState) => ({
        visible: true,
        posX: e.clientX,
        posY: e.clientY,
        id: e.target.id,
      }));
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("contextmenu", handleRightClick);

    return () => {
      document.addEventListener("contextmenu", handleRightClick);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onContextMenuItemClick = (e: any) => {
    // check if modal is required
    if (contextFunctionList[0].modalSpecs.isModal) {
      setShowModal(true);
    } else {
      contextFunctionList[0].fn(e);
    }
  };

  // TO DO: this will change when generic type is introduced
  const isContextVisible =
    contextData.visible && contextData && contextData.id === item._id;
  return (
    <>
      {isContextVisible && (
        <div
          ref={contextRef}
          style={{
            left: contextData.posX,
            top: contextData.posY,
            border: "solid black",
            backgroundColor: "white",
            position: "absolute",
          }}
        >
          <div onClick={onContextMenuItemClick} id={item._id}>
            Delete {item.listName}
          </div>
          <ActionModal
            showModal={showModal}
            setShowModal={setShowModal}
            actionFunction={contextFunctionList[0].fn}
            actionId={item._id}
          />
        </div>
      )}
    </>
  );
}

function ActionModal({
  showModal,
  setShowModal,
  actionFunction,
  actionId,
}: ModalProps) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  {/* TO DO: title prop */}
                  <h3 className="text-3xl font-semibold">Delete task list</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {/* TO DO: description prop */}
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Are you sure you want to delete this task?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => actionFunction(actionId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
