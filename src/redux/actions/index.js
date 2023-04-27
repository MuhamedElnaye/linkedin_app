import * as actionsCreators from "./ActionsCreators";
import { auth, db, provider, storage } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
//To Do Signin to Linked in
export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(actionsCreators.setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    //To change user Account with store in Redux
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(actionsCreators.setUser(user));
      }
    });
  };
}

//To Do SinOut fron Linkedin
export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(actionsCreators.setUser(null));
      })
      .catch((error) => alert(error.message));
  };
}
//to Do Share Post in the
// and save it in first [Storage] second[database] in Firebase
export const postArticlesAPI = (payload) => {
  return (dispatch) => {
    dispatch(actionsCreators.setLoading(true));
    // in Case you  Are Upload image
    if (payload.image) {
      ///////#####//process of save the image source in firebase [Storage] ##########
      const storageRef = ref(storage, `images/${payload.image.name}`);
      //procss of Uploading the image
      // uploadBytesResumable :this function using to coninue the upload after
      // the internet stop
      const upLaodRef = uploadBytesResumable(storageRef, payload.image);
      upLaodRef.on(
        //in case you are change your schoose during the Process of sharing Post
        "state_changed",
        //the Process of Knowing the [size] of uploading during the upload
        (snapshot) => {
          //snapshot.bytesTransferred: the current size of image  that upload
          // snapshot.totalBytes :the Total size of image  that upload
          //*100 to comeBack the size with bercentage
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is : " + progress + "% done");
        },
        // in case there Are Error alart wi
        (error) => {
          alert(error);
        },
        ///////######### the Process Of saving data in [Database] ############
        () => {
          //Process Of the uploading image with actual size to image i DB
          //process of found the URl of The Iamge to Store it
          getDownloadURL(upLaodRef.snapshot.ref).then((downlaodURL) => {
            //The Process of Creating a [Collection] in [datebase]
            const collRef = collection(db, "articles");
            addDoc(collRef, {
              //actor or writing post Data
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              comment: 3,
              video: payload.video,
              description: payload.description,
              shareImage: downlaodURL,
            });
          });
          //share to that the process of UpLaoding done
          dispatch(actionsCreators.setLoading(false));
        }
      );
    }
    // in Case you  Are Upload Video
    else if (payload.video) {
      const collRef = collection(db, "articles");
      addDoc(collRef, {
        //actor or writing post Data
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        comment: 0,
        video: payload.video,
        description: payload.description,
        shareImage: payload.image,
      });
      dispatch(actionsCreators.setLoading(false));
    }
    // in Case you  Are Upload normal post without video or image
    else {
      const collRef = collection(db, "articles");
      addDoc(collRef, {
        //actor or writing post Data
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        comment: 0,
        video: payload.video,
        description: payload.description,
        shareImage: payload.image,
      });
      dispatch(actionsCreators.setLoading(false));
    }
  };
};

export function getArticlesAPI() {
  return (dispatch) => {
    let payload;
    const collRef = collection(db, "articles");
    const orderRef = query(collRef, orderBy("actor.date", "desc"));
    onSnapshot(orderRef, (snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data());
      dispatch(actionsCreators.setAritcles(payload));
    });
  };
}
