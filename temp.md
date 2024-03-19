<div class="title">{= data.title =}</div>
<div class="episodes-list"> ##
let episodeNumber = 1;
for (let episodeName of data.episodes) { ##
    <div class="episode-name"><span>{= episodeNumber =}</span><span>{= episodeName =}</span></div> ## 
    episodeNumber++;
} ##
</div>

