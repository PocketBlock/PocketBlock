<?php

#==Start
# @category = Player Events
# @imports = pocketmine\event\player\PlayerJoinEvent
# @function = $event->setJoinMessage(["field_variable", "String"]);|joinmessage| set JoinMessage
# @function = $event->cancel();|cancelevent| Cancel event
public function onPlayerJoin(PlayerJoinEvent $event) {

	$joinMessage = $event->getJoinMessage();
	$player = $event->getPlayer();
	$playerName = $player->getName();

%1
}
#==End

#==Start
# @category = Player Events
# @imports = pocketmine\event\player\PlayerQuitEvent
# @function = $event->setQuitMessage(["field_variable", "String"]);|quitmessage| set QuitMessage
# @function = $event->cancel();|cancelevent| Cancel event
public function onPlayerQuit(PlayerQuitEvent $event) {

	$quitMessage = $event->getQuitMessage();
	$player = $event->getPlayer();
	$playerName = $player->getName();

%1
}
#==End

#==Start
# @category = Player Events
# @imports = pocketmine\event\player\PlayerChatEvent
# @function = $event->setMessage(["field_variable", "String"]);|setMessage| set Message
# @function = $event->setFormat(["field_variable", "String"]);|setFormat| set Format
# @function = $event->cancel();|cancelevent| Cancel event
public function onPlayerChat(PlayerChatEvent $event) {

	$player = $event->getPlayer();
	$playerName = $player->getName();
	$message = $event->getMessage();
	$format = $event->getFormat();


%1
}
#==End

#==Start
# @category = Player Events
# @imports = pocketmine\event\player\PlayerDeathEvent
# @function = $event->setMessage(["field_variable", "String"]);|setMessage| set Message
# @function = $event->setFormat(["field_variable", "String"]);|setFormat| set Format
# @function = $event->cancel();|cancelevent| Cancel event
public function onPlayerChat(PlayerChatEvent $event) {

	$player = $event->getPlayer();
	$playerName = $player->getName();
	$message = $event->getMessage();
	$format = $event->getFormat();


%1
}
#==End
