import MusicView from '../component/MusicView';
import PlayLists from '../component/PlayLists';
import {useState} from 'react';
import {
  playList_Top50, 
  playList_jazz
       } from '../data/playList'

export default function Home() {
  return (
    <div>
      <PlayLists query={{title:"TOP-50 플레이리스트",playListId: playList_Top50}} />
      <PlayLists query={{title:"Jazz 플레이리스트",playListId: playList_jazz}} />
      <MusicView query={{limit: 16, title:"금주 인기 음악" ,id:"37i9dQZEVXbMDoHDwVN2tF"}} />
      <MusicView query={{limit: 16, title:"인기 외국 힙합", id:"37i9dQZF1DX0XUsuxWHRQd"}} />
      
    </div>
  );
}
