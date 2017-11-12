import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {
      trigger,
      state,
      style,
      animate,
      transition
} from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Firebase

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestoreProvider, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook as FacebookClass, FacebookLoginResponse } from '@ionic-native/facebook';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { NativeAudio } from '@ionic-native/native-audio';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

// Classes
import { Challenge } from '../classes/api/challenge';
import { Invitation } from '../classes/api/invitation';
import { Rendition } from '../classes/api/rendition';
import { User } from '../classes/api/user';
import { Storage } from '../classes/storage/storage';
import { List, Document } from '../classes/database/database';
import { Alert, Toast } from '../classes/notify/notify';
import { Facebook } from '../classes/login/facebook';
import { Auth } from '../classes/login/auth';
import { Audio } from '../classes/audio/audio';
import { Transfer } from '../classes/audio/transfer';
import { TimeSince } from '../classes/timesince/timesince';
import { Email } from '../classes/send/email';

// Pages
import { MyRenditionsPage } from '../pages/myrenditions/myrenditions';
import { ChallengePage } from '../pages/challenge/challenge';
import { LeaderboardPage } from '../pages/leaderboard/leaderboard';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ChallengeboardPage } from '../pages/challengeboard/challengeboard';
import { RenditionPage } from '../pages/rendition/rendition';

// Youtube
import { YoutubeComponent } from '../components/youtube/youtube';
import { youTubeServiceInjectables } from '../components/youtube/youtube';
import { SearchResultComponent } from '../components/youtube/youtube';
import { SearchBox } from '../components/youtube/youtube';

// Components
import { PlaceholderComponent } from '../components/placeholder/placeholder';
import { ChallengeComponent } from '../components/challenge/challenge';

export const firebaseConfig = {
      apiKey: "AIzaSyD8H89VVKlhY6HE9t7kMYONXj80A1y3UYI",
      authDomain: "romeo-2025b.firebaseapp.com",
      databaseURL: "https://romeo-2025b.firebaseio.com",
      projectId: "romeo-2025b",
      storageBucket: "",
      messagingSenderId: "632890559175"
};

@NgModule({
      declarations: [
            MyApp,
            // Pages
            MyRenditionsPage,
            ChallengePage,
            LeaderboardPage,
            TabsPage,
            LoginPage,
            ChallengeboardPage,
            RenditionPage,
            // Components
            YoutubeComponent,
            SearchBox,
            SearchResultComponent,
            PlaceholderComponent,
            ChallengeComponent
      ],
      imports: [
            BrowserAnimationsModule,
            BrowserModule,
            HttpClientModule,
            IonicModule.forRoot(MyApp),
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFirestoreModule,
            AngularFireDatabaseModule,
            AngularFireAuthModule
      ],
      bootstrap: [IonicApp],
      entryComponents: [
            MyApp,
            MyRenditionsPage,
            ChallengePage,
            LeaderboardPage,
            TabsPage,
            LoginPage,
            ChallengeboardPage,
            RenditionPage
      ],
      providers: [
            StatusBar,
            SplashScreen,
            AngularFireDatabase,
            AngularFirestoreProvider,
            {provide: ErrorHandler, useClass: IonicErrorHandler},
            youTubeServiceInjectables,
            // Native
            NativeStorage,
            FacebookClass,
            MediaCapture,
            NativeAudio,
            EmailComposer,
            File,
            FileTransfer,
            // Classes
            Storage,
            Facebook,
            Auth,
            Audio,
            Transfer,
            List,
            Document,
            Alert,
            Toast,
            TimeSince,
            Email
      ]
})
export class AppModule {}
