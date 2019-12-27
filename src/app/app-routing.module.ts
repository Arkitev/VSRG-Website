import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './panels/home/home.component';
import { OsumaniaComponent } from './panels/games/osumania/osumania.component';
import { BeatmaniaiidxComponent } from './panels/games/beatmaniaiidx/beatmaniaiidx.component';
import { LunaticraveComponent } from './panels/games/lunaticrave/lunaticrave.component';
import { DdrComponent } from './panels/games/ddr/ddr.component';
import { SoundvoltexComponent } from './panels/games/soundvoltex/soundvoltex.component';
import { PlayersComponent } from './panels/players/players.component';
import { EventsComponent } from './panels/events/events.component';
import { RankingsComponent } from './panels/rankings/rankings.component';
import { DownloadsComponent } from './panels/downloads/downloads.component';
import { UserPanelComponent } from './panels/user-panel/user-panel.component';
import { AuthorizationGuard } from './authorization/authorization-guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'games/osumania', component: OsumaniaComponent },
  { path: 'games/beatmaniaiidx', component: BeatmaniaiidxComponent },
  { path: 'games/lunaticrave', component: LunaticraveComponent },
  { path: 'games/ddr', component: DdrComponent },
  { path: 'games/soundvoltex', component: SoundvoltexComponent },
  { path: 'community/players', component: PlayersComponent },
  { path: 'community/events', component: EventsComponent },
  { path: 'rankings', component: RankingsComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: 'user-panel', component: UserPanelComponent, canActivate: [AuthorizationGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ HomeComponent,
   OsumaniaComponent, BeatmaniaiidxComponent, LunaticraveComponent, DdrComponent, SoundvoltexComponent,
    PlayersComponent, EventsComponent, RankingsComponent, DownloadsComponent, UserPanelComponent ];
