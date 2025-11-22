using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VibeLink.Protocol;
using VibeLink.Powers;

namespace VibeLink.Editor
{
    /// <summary>
    /// Executes VibeLink commands by delegating to modular Powers
    /// </summary>
    public class VibeLinkExecutor
    {
        private readonly Dictionary<string, IVibeLinkPower> _powers;

        public VibeLinkExecutor(
            IVibeLinkPower eyesPower,
            IVibeLinkPower handsPower,
            IVibeLinkPower brainPower,
            IVibeLinkPower timeMachinePower)
        {
            _powers = new Dictionary<string, IVibeLinkPower>
            {
                ["unity_capture_view"] = eyesPower,
                ["unity_execute_script"] = handsPower,
                ["unity_query_state"] = brainPower,
                ["unity_run_playmode"] = timeMachinePower
            };
        }

        /// <summary>
        /// Execute a command by routing to the appropriate Power
        /// </summary>
        public async Task<VibeLinkResponse> Execute(VibeLinkMessage message)
        {
            if (_powers.TryGetValue(message.command, out IVibeLinkPower power))
            {
                return await power.Execute(message);
            }

            return new VibeLinkResponse(
                message.id,
                false,
                null,
                $"Unknown command: {message.command}. Available commands: {string.Join(", ", _powers.Keys)}"
            );
        }
    }
}
