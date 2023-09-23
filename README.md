qb-lock
https://streamable.com/fxjwpf

![image](https://github.com/yungmexx/qb-lock-rework/assets/113365369/d0c79171-b30a-4734-ad85-6dab88b26eab)
![image](https://github.com/yungmexx/qb-lock-rework/assets/113365369/54f3a652-5e33-4484-b0e3-33a02fb609b7)
![image](https://github.com/yungmexx/qb-lock-rework/assets/113365369/2e466f86-d618-4c29-a628-3b5b881022d4)
![image](https://github.com/yungmexx/qb-lock-rework/assets/113365369/5c3c5b32-fd97-4645-b65d-6d3444dd9a63)


cfx post: https://forum.cfx.re/t/qb-lock-reseign/5171106

Template
exports['qb-lock']:StartLockPickCircle(amount, time, function(success)
Example useage
RegisterCommand("lpgame", function()
	local time = math.random(7,10)
	local circles = math.random(2,4)
	local success = exports['qb-lock']:StartLockPickCircle(circles, time, success)
	print(success)
	if success then
		print("WIN")
	else
		print("FAIL")
	end
end)
Useful Snippet
for everyone here that wants to add the minigame to other script in a very simple way

local seconds = math.random(9,12)
local circles = math.random(1,3)
local success = exports['qb-lock']:StartLockPickCircle(circles, seconds, success)
if success then
QBCore.Functions.Notify(" Success", "success")
end
